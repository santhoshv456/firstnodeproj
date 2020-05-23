const genres = require('../routes/genres');
const error = require('../middleware/error');
const customers = require('../routes/customers');
const movies = require('../routes/movie');
const rentals = require('../routes/rental');
const auth = require('../routes/auth');
const users = require('../routes/users');
const express = require('express');


module.exports = function(app){  
app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);
}