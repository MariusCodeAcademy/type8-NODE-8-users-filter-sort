const express = require('express');
const { dbClient } = require('../config');

const userRoutes = express.Router();

// ROUTES
userRoutes.get('/users', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    res.json('get users route');
  } catch (error) {
    console.error('error in get users', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

module.exports = userRoutes;
