const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return { users: [], events: [], registrations: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing data.json:', error);
    return false;
  }
};

module.exports = { readData, writeData };
