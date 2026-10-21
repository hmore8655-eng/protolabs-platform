const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db.cjs');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be configured as an environment variable with at least 32 characters.');
}

const https = require('https');

const AUTHORIZED_ADMIN_EMAILS = [
  'hmore8655@gmail.com',
  'protolabs26@gmail.com'
];

const verifyGoogleToken = (idToken) => {
  return new Promise((resolve, reject) => {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300 && json.email) {
            resolve(json);
          } else {
            reject(new Error(json.error_description || json.error || 'Invalid Google Token'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

const loginWithGoogle = async (idToken) => {
  try {
    const googlePayload = await verifyGoogleToken(idToken);
    const googleEmail = (googlePayload.email || '').toLowerCase().trim();

    const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(e => e.toLowerCase() === googleEmail);
    if (!isAuthorized) {
      return { 
        error: `Access Denied: Google account (${googleEmail}) is not authorized. Only official ProtoLabs administrator accounts are permitted.` 
      };
    }

    let user = db.data.users ? db.data.users.find(u => u.email.toLowerCase() === googleEmail) : null;
    if (!user) {
      user = {
        id: `usr-google-${Date.now()}`,
        name: 'ProtoLabs Engineer',
        email: googleEmail,
        role: 'admin'
      };
      if (db.data.users) db.data.users.push(user);
      db.save();
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'admin', name: user.name },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'admin',
        picture: googlePayload.picture || null
      }
    };
  } catch (err) {
    return { error: `Google verification failed: ${err.message}` };
  }
};

const loginUser = (email, password) => {
  let user = null;
  if (email) {
    const normalizedEmail = String(email).trim().toLowerCase();
    user = db.data.users.find(u => String(u.email || '').trim().toLowerCase() === normalizedEmail);
  }
  if (!user || user.role !== 'admin') {
    return { error: 'Admin account not configured' };
  }

  const hasPasswordHash = typeof user.passwordHash === 'string' && user.passwordHash.length > 0;
  const isHashMatch = hasPasswordHash && bcrypt.compareSync(password, user.passwordHash);
  const isEnvironmentPasswordMatch = Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;
  const isMatch = isHashMatch || isEnvironmentPasswordMatch;

  if (!isMatch) {
    return { error: 'Invalid admin password' };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator access required.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = {
  loginUser,
  loginWithGoogle,
  verifyToken,
  AUTHORIZED_ADMIN_EMAILS,
  JWT_SECRET
};
