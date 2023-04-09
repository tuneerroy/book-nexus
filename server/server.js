const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname, '/../.env')});

const express = require('express');
const bookRouter = require('./routes/Book');
const authorRouter = require('./routes/Author');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

const port = 8000;

app.use('/api/books', bookRouter);
app.use('/api/authors', authorRouter);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

module.exports = server;

