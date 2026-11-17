const express = require('express');
const { readData, writeData } = require('../utils/fileHandler');
const { verifyToken, checkRole } = require('../middleware/roleCheck');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all users (admin only)
router.get('/users', verifyToken, checkRole('admin'), (req, res) => {
  const data = readData();
  res.json(data.users);
});

// Add organizer (admin only)
router.post('/users/organizer', verifyToken, checkRole('admin'), (req, res) => {
  const { name, email, password } = req.body;
  const data = readData();

  if (data.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    id: 'org-' + uuidv4(),
    name,
    email,
    password,
    role: 'organizer',
    active: true
  };

  data.users.push(newUser);
  writeData(data);

  res.status(201).json(newUser);
});

// Get platform stats (admin only)
router.get('/stats', verifyToken, checkRole('admin'), (req, res) => {
  const data = readData();

  const stats = {
    totalUsers: data.users.length,
    totalEvents: data.events.length,
    totalRegistrations: data.registrations.length,
    publishedEvents: data.events.filter(e => e.status === 'published').length,
    organizersCount: data.users.filter(u => u.role === 'organizer').length
  };

  res.json(stats);
});

// Delete event (admin only)
router.delete('/events/:id', verifyToken, checkRole('admin'), (req, res) => {
  const data = readData();
  const eventIndex = data.events.findIndex(e => e.id === req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  data.events.splice(eventIndex, 1);
  data.registrations = data.registrations.filter(r => r.eventId !== req.params.id);
  writeData(data);

  res.json({ message: 'Event deleted' });
});

module.exports = router;
