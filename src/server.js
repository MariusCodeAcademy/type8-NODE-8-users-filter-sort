const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./api/usersRoutes');
const { PORT } = require('./config');

const app = express();

// Global MiddleWare
app.use(morgan('dev'));

app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => console.log('server online, PORT', PORT));
