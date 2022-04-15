const express = require('express');
const { dbClient } = require('../config');

const userRoutes = express.Router();

// ROUTES
userRoutes.get('/users', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    // parsiusti visus usersius is node7 ir grazinti json [] pavidalu
    const collection = dbClient.db('node7').collection('users');
    const usersArr = await collection.find().toArray();
    console.log('connected');
    res.json(usersArr);
  } catch (error) {
    console.error('error in get users', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// GET /api/users/sort-age/:sortOrder ASC DESC
userRoutes.get('/users/sort-age/:sortOrder', async (req, res) => {
  try {
    const { sortOrder } = req.params;
    let order = 1;
    order = sortOrder === 'DESC' ? -1 : 1;
    const options = {
      sort: { age: order },
    };
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    // parsiusti visus usersius is node7 ir grazinti json [] pavidalu
    const collection = dbClient.db('node7').collection('users');
    const usersArr = await collection.find({}, options).toArray();
    console.log('connected');
    res.json(usersArr);
  } catch (error) {
    console.error('error in get users', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// GET /api/users/students - parsiusncia tik studentus
// front mygtukas "show students" paspaude parsiunciam tik studentus

// prisideti 3 skirtingus miestus, po viena kiekvienam studentui
// GET /api/users/town/London - parsiuncia tik is to miesto

module.exports = userRoutes;
