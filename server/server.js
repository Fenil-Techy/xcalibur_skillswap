const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://xcalibur:gkN61rXA8WLVJ3ET@cluster.baay4ur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    seedAdmin();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(cors());
app.use(express.json());

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});
const User = mongoose.model('User', userSchema);

// User profile schema (extend user for demo)
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: String,
  location: String,
  skillsOffer: [String],
  skillsWant: [String],
  availability: [String],
  isPublic: { type: Boolean, default: true },
});
const Profile = mongoose.model('Profile', profileSchema);

// Swap request schema (mock for now)
const swapRequestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offeredSkill: String,
  wantedSkill: String,
  message: String,
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
});
const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);

// Seed admin user
async function seedAdmin() {
  const admin = await User.findOne({ email: 'admin@gmail.com' });
  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10);
    await User.create({ email: 'admin@gmail.com', password: hash, role: 'admin' });
    console.log('Admin user seeded');
  }
}

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, user: { email: user.email, role: user.role } });
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, role: 'user' });
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, user: { email: user.email, role: user.role } });
});

// Example protected admin route
app.get('/api/admin', auth, requireAdmin, (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

// Get all public users (for swap page)
app.get('/api/users', async (req, res) => {
  const profiles = await Profile.find({ isPublic: true }).populate('userId', 'email');
  res.json(profiles);
});

// Get current user's profile
app.get('/api/profile', auth, async (req, res) => {
  let profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) profile = await Profile.create({ userId: req.user.id });
  res.json(profile);
});

// Update current user's profile
app.put('/api/profile', auth, async (req, res) => {
  const update = req.body;
  let profile = await Profile.findOneAndUpdate({ userId: req.user.id }, update, { new: true, upsert: true });
  res.json(profile);
});

// Get swap requests for current user
app.get('/api/swap-requests', auth, async (req, res) => {
  const requests = await SwapRequest.find({ to: req.user.id });
  res.json(requests);
});

// Create a swap request
app.post('/api/swap-requests', auth, async (req, res) => {
  const { to, offeredSkill, wantedSkill, message } = req.body;
  const swap = await SwapRequest.create({ from: req.user.id, to, offeredSkill, wantedSkill, message });
  res.json(swap);
});

// Update swap request status (accept/reject)
app.put('/api/swap-requests/:id', auth, async (req, res) => {
  const { status } = req.body;
  const swap = await SwapRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(swap);
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
