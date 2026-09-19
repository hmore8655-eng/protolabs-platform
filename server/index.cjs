const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const db = require('./db.cjs');
const { loginUser, verifyToken } = require('./services/auth.cjs');
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

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  const userEmail = email || 'admin@protolabs.eng';
  const result = loginUser(userEmail, password);

  if (result.error) {
    return res.status(401).json(result);
  }
  return res.json(result);
});

app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
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

// Portfolio API
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

// Testimonials API
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

app.post('/api/reset-demo', verifyToken, (req, res) => {
  const freshData = db.reset();
  res.json({ success: true, message: 'Database reset to factory demo values', data: freshData });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 ProtoLabs Full-Stack Express Backend Active!`);
  console.log(`📡 Listening on: http://localhost:${PORT}`);
  console.log(`💾 Database file: server/data/database.json`);
  console.log(`=======================================================`);
});
