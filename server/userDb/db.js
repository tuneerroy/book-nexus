const mongoose = require('mongoose');

mongoose.connect('');

const db = mongoose.connection;
db.on('connected', () => {
    console.log("Connected to MongoDB")
});

module.exports = db;