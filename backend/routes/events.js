const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../utils/fileHandler');
const { verifyToken, checkRole } = require('../middleware/roleCheck');

const router = express.Router();

// Get all public events
router.get('/', (req, res) => {
  const data = readData();
  const publicEvents = data.events.filter(e => e.status === 'published');
  res.json(publicEvents);
});

// Get event by ID
router.get('/:id', (req, res) => {
  const data = readData();
  const event = data.events.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  res.json(event);
});

// Create event (organizer only)
router.post('/', verifyToken, checkRole('organizer'), (req, res) => {
  const { title, description, category, date, time, location, capacity } = req.body;
  const data = readData();

  const newEvent = {
    id: 'evt-' + uuidv4(),
    title,
    description,
    category,
    organizerId: req.user.id,
    date,
    time,
    location,
    capacity,
    registered: 0,
    status: 'draft',
    createdAt: new Date().toISOString()
  };

  data.events.push(newEvent);
  writeData(data);

  res.status(201).json(newEvent);
});

// Update event (organizer only)
router.put('/:id', verifyToken, checkRole('organizer'), (req, res) => {
  const data = readData();
  const eventIndex = data.events.findIndex(e => e.id === req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  if (data.events[eventIndex].organizerId !== req.user.id) {
    return res.status(403).json({ error: 'You can only edit your own events' });
  }

  data.events[eventIndex] = { ...data.events[eventIndex], ...req.body, id: req.params.id };
  writeData(data);

  res.json(data.events[eventIndex]);
});

// Get organizer's events
router.get('/organizer/my-events', verifyToken, checkRole('organizer'), (req, res) => {
  const data = readData();
  const myEvents = data.events.filter(e => e.organizerId === req.user.id);
  res.json(myEvents);
});

module.exports = router;
