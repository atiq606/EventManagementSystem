const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../utils/fileHandler');

const router = express.Router();

// Register for an event
router.post('/', (req, res) => {
  const { eventId, name, email, phone } = req.body;

  if (!eventId || !name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const data = readData();
  const event = data.events.find(e => e.id === eventId);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  if (event.registered >= event.capacity) {
    return res.status(400).json({ error: 'Event is full' });
  }

  const registration = {
    id: 'reg-' + uuidv4(),
    eventId,
    name,
    email,
    phone,
    registeredAt: new Date().toISOString()
  };

  data.registrations.push(registration);
  event.registered += 1;
  writeData(data);

  res.status(201).json({ message: 'Registration successful', registration });
});

// Get registrations for an event
router.get('/:eventId', (req, res) => {
  const data = readData();
  const registrations = data.registrations.filter(r => r.eventId === req.params.eventId);
  res.json(registrations);
});

module.exports = router;
