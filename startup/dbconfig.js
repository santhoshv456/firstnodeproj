const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function()
{
    mongoose.connect('mongodb://localhost/videly')
    .then(() => winston.info('Connected to Mongodb'));
}

