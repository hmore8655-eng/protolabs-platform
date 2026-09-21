require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const db = require('./db.cjs');
const { loginUser, loginWithGoogle, verifyToken, AUTHORIZED_ADMIN_EMAILS } = require('./services/auth.cjs');
const { sendInquiryConfirmation, sendQuoteProposalEmail } = require('./services/email.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${basename}_${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

app.use((req, res, next) => {
  console.log(`[REST API] ${req.method} ${req.url}`);
  next();
});

// Explicit robots.txt and sitemap.xml handlers for Googlebot / Search Crawlers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\nDisallow:\n\nSitemap: https://protolabs-platform.onrender.com/sitemap.xml\n');
});

app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
  const pubPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    res.type('application/xml');
    return res.sendFile(sitemapPath);
  } else if (fs.existsSync(pubPath)) {
    res.type('application/xml');
    return res.sendFile(pubPath);
  }
  res.status(404).send('Sitemap not found');
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  const userEmail = email || 'protolabs26@gmail.com';
  const result = loginUser(userEmail, password);

  if (result.error) {
    return res.status(401).json(result);
  }
  return res.json(result);
});

app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: 'Google credential token is required' });
  }

  const result = await loginWithGoogle(credential);
  if (result.error) {
    return res.status(403).json(result);
  }
  return res.json(result);
});

app.get('/api/auth/config', (req, res) => {
  res.json({
    googleClientId: process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '240596567313-jlkud0rbae1nj39mojkepk98tv77i08k.apps.googleusercontent.com',
    authorizedEmails: AUTHORIZED_ADMIN_EMAILS
  });
});

// Projects API
app.get('/api/projects', (req, res) => {
  res.json(db.data.projects);
});

app.post('/api/projects', verifyToken, (req, res) => {
  const newProject = {
    ...req.body,
    id: `proj-${Date.now()}`,
    order: db.data.projects.length + 1,
    createdAt: new Date().toISOString().split('T')[0]
  };
  db.data.projects.unshift(newProject);
  db.save();
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const index = db.data.projects.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });

  db.data.projects[index] = { ...db.data.projects[index], ...req.body };
  db.save();
  res.json(db.data.projects[index]);
});

app.delete('/api/projects/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.data.projects = db.data.projects.filter(p => p.id !== id);
  db.save();
  res.json({ success: true, message: `Project ${id} deleted` });
});

app.post('/api/projects/reorder', verifyToken, (req, res) => {
  const { projects } = req.body;
  if (Array.isArray(projects)) {
    db.data.projects = projects;
    db.save();
  }
  res.json({ success: true, projects: db.data.projects });
});

app.post('/api/projects/bulk-import', verifyToken, (req, res) => {
  const { projects } = req.body;
  if (Array.isArray(projects) && projects.length > 0) {
    db.data.projects = [...projects, ...db.data.projects];
    db.save();
  }
  res.status(201).json({ success: true, count: projects.length });
});

// Inquiries API
app.get('/api/inquiries', verifyToken, (req, res) => {
  res.json(db.data.inquiries);
});

app.post('/api/inquiries', async (req, res) => {
  const newInquiry = {
    ...req.body,
    id: `inq-${Date.now()}`,
    status: 'Pending',
    createdAt: new Date().toISOString().split('T')[0]
  };
  db.data.inquiries.unshift(newInquiry);
  db.save();

  await sendInquiryConfirmation(newInquiry);
  res.status(201).json(newInquiry);
});

app.put('/api/inquiries/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status, notes, quotedPrice, customMessage } = req.body;
  const inq = db.data.inquiries.find(i => i.id === id);

  if (!inq) return res.status(404).json({ error: 'Inquiry not found' });

  inq.status = status || inq.status;
  if (notes !== undefined) inq.notes = notes;
  if (quotedPrice !== undefined) inq.quotedPrice = quotedPrice;

  db.save();

  if (status === 'Quoted' && customMessage) {
    await sendQuoteProposalEmail(inq, quotedPrice, customMessage);
  }

  res.json(inq);
});

app.delete('/api/inquiries/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.data.inquiries = db.data.inquiries.filter(i => i.id !== id);
  db.save();
  res.json({ success: true });
});

// Live Chat API Endpoints (Client - Admin real-time thread messages)
app.get('/api/chat/threads', (req, res) => {
  if (!db.data.chatThreads) db.data.chatThreads = [];
  res.json(db.data.chatThreads);
});

app.get('/api/chat/messages/:threadId', (req, res) => {
  const { threadId } = req.params;
  if (!db.data.chatMessages) db.data.chatMessages = [];
  const messages = db.data.chatMessages.filter(m => m.threadId === threadId);
  res.json(messages);
});

app.put('/api/chat/threads/:id/seen', verifyToken, (req, res) => {
  const { id } = req.params;
  const { isSeen } = req.body;
  if (!db.data.chatThreads) db.data.chatThreads = [];
  const thread = db.data.chatThreads.find(t => t.id === id);
  if (!thread) return res.status(404).json({ error: 'Thread not found' });

  const seenStatus = isSeen !== undefined ? !!isSeen : true;
  thread.isSeen = seenStatus;
  thread.unreadCount = seenStatus ? 0 : Math.max(1, thread.unreadCount || 1);
  thread.updatedAt = new Date().toISOString();
  db.save();
  res.json(thread);
});

app.delete('/api/chat/threads/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  if (!db.data.chatThreads) db.data.chatThreads = [];
  if (!db.data.chatMessages) db.data.chatMessages = [];

  const initialCount = db.data.chatThreads.length;
  db.data.chatThreads = db.data.chatThreads.filter(t => t.id !== id);
  db.data.chatMessages = db.data.chatMessages.filter(m => m.threadId !== id);
  db.save();

  res.json({ success: true, deleted: initialCount !== db.data.chatThreads.length });
});

app.post('/api/chat/messages', (req, res) => {
  const { threadId, clientName, clientEmail, senderName, sender, text, priceQuote, timelineQuote } = req.body;
  if (!threadId || !text) return res.status(400).json({ error: 'threadId and text required' });

  if (!db.data.chatThreads) db.data.chatThreads = [];
  if (!db.data.chatMessages) db.data.chatMessages = [];

  let thread = db.data.chatThreads.find(t => t.id === threadId);
  const resolvedName = clientName || (sender === 'client' ? senderName : null) || 'Client Visitor';
  const resolvedEmail = clientEmail || 'visitor@protolabs.eng';

  if (!thread) {
    thread = {
      id: threadId,
      clientName: resolvedName,
      clientEmail: resolvedEmail,
      lastMessage: text,
      lastActivity: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      unreadCount: sender === 'client' ? 1 : 0,
      isSeen: sender === 'admin'
    };
    db.data.chatThreads.unshift(thread);
  } else {
    if (clientName) thread.clientName = clientName;
    if (clientEmail) thread.clientEmail = clientEmail;
    thread.lastMessage = text;
    thread.lastActivity = new Date().toISOString();
    thread.updatedAt = new Date().toISOString();
    if (sender === 'client') {
      thread.unreadCount = (thread.unreadCount || 0) + 1;
      thread.isSeen = false;
    } else {
      thread.unreadCount = 0;
      thread.isSeen = true;
    }
    if (priceQuote) thread.agreedPrice = priceQuote;
    if (timelineQuote) thread.agreedTimeline = timelineQuote;
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    threadId,
    sender: sender || 'client', // 'client' or 'admin'
    senderName: senderName || (sender === 'admin' ? 'ProtoLabs Engineer' : resolvedName),
    text,
    priceQuote,
    timelineQuote,
    timestamp: new Date().toISOString()
  };

  db.data.chatMessages.push(newMessage);
  db.save();

  res.status(201).json(newMessage);
});

// Portfolio & Testimonials API
app.get('/api/portfolio', (req, res) => res.json(db.data.portfolio));
app.post('/api/portfolio', verifyToken, (req, res) => {
  const newItem = { ...req.body, id: `port-${Date.now()}` };
  db.data.portfolio.unshift(newItem);
  db.save();
  res.status(201).json(newItem);
});
app.put('/api/portfolio/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const idx = db.data.portfolio.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });

  db.data.portfolio[idx] = { ...db.data.portfolio[idx], ...req.body };
  db.save();
  res.json(db.data.portfolio[idx]);
});
app.delete('/api/portfolio/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.data.portfolio = db.data.portfolio.filter(p => p.id !== id);
  db.save();
  res.json({ success: true });
});

app.get('/api/testimonials', (req, res) => res.json(db.data.testimonials));
app.post('/api/testimonials', verifyToken, (req, res) => {
  const newItem = { ...req.body, id: `test-${Date.now()}` };
  db.data.testimonials.unshift(newItem);
  db.save();
  res.status(201).json(newItem);
});
app.put('/api/testimonials/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const idx = db.data.testimonials.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Testimonial not found' });

  db.data.testimonials[idx] = { ...db.data.testimonials[idx], ...req.body };
  db.save();
  res.json(db.data.testimonials[idx]);
});
app.delete('/api/testimonials/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.data.testimonials = db.data.testimonials.filter(t => t.id !== id);
  db.save();
  res.json({ success: true });
});

// Services & Settings
app.get('/api/services', (req, res) => res.json(db.data.services));
app.put('/api/services', verifyToken, (req, res) => {
  db.data.services = req.body;
  db.save();
  res.json(db.data.services);
});

app.get('/api/how-it-works', (req, res) => res.json(db.data.howItWorks));
app.put('/api/how-it-works', verifyToken, (req, res) => {
  db.data.howItWorks = req.body;
  db.save();
  res.json(db.data.howItWorks);
});

app.get('/api/settings', (req, res) => {
  res.json({ hero: db.data.hero, settings: db.data.settings });
});
app.put('/api/settings', verifyToken, (req, res) => {
  if (req.body.hero) db.data.hero = { ...db.data.hero, ...req.body.hero };
  if (req.body.settings) db.data.settings = { ...db.data.settings, ...req.body.settings };
  db.save();
  res.json({ hero: db.data.hero, settings: db.data.settings });
});

app.post('/api/upload', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, fileUrl, filename: req.file.filename });
});

app.get('/api/database/status', (req, res) => {
  res.json({
    isCloud: db.isCloudConnected,
    error: db.cloudError || null,
    mode: db.isCloudConnected ? 'MongoDB Atlas (Persistent Cloud Database)' : 'Local Disk JSON (Ephemeral on Free Render Containers)',
    info: db.isCloudConnected 
      ? 'All catalog edits, inquiries, and chat threads are permanently saved in MongoDB Atlas.'
      : (db.cloudError 
          ? `MongoDB connection pending or blocked (${db.cloudError}). Please ensure MongoDB Atlas Network Access has 0.0.0.0/0 (Allow Access from Anywhere).`
          : 'Running on local file storage. Add MONGODB_URI to environment variables.')
  });
});

app.get('/api/admin/export', verifyToken, (req, res) => {
  const exportData = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    data: db.data
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="protolabs-backup-${new Date().toISOString().slice(0, 10)}.json"`);
  res.send(JSON.stringify(exportData, null, 2));
});

app.post('/api/admin/restore', verifyToken, (req, res) => {
  try {
    const payload = req.body;
    const dataToImport = payload.data || payload;
    if (!dataToImport || !Array.isArray(dataToImport.projects)) {
      return res.status(400).json({ error: 'Invalid backup format. Must contain valid projects array.' });
    }
    const updated = db.importData(dataToImport);
    res.json({ success: true, message: 'Database restored successfully!', data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reset-demo', verifyToken, (req, res) => {
  const freshData = db.reset();
  res.json({ success: true, message: 'Database reset to factory demo values', data: freshData });
});

// Serve static frontend build in production for Render / Railway / Heroku
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      return res.sendFile(path.join(DIST_DIR, 'index.html'));
    }
    next();
  });
}

// Start Server with Cloud Database Initialization
(async () => {
  try {
    await db.initCloud();
  } catch (e) {
    console.error('Cloud storage init error:', e);
  }

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 ProtoLabs Full-Stack Express Backend Active!`);
    console.log(`📡 Listening on: http://localhost:${PORT}`);
    console.log(`💾 Storage Mode: ${db.isCloudConnected ? 'MongoDB Atlas (Persistent Cloud)' : 'Local File (database.json)'}`);
    console.log(`=======================================================`);
  });
})();
