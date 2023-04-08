const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/Book');

const app = express();
app.use(cors({
  origin: '*',
}));
const port = 8000

app.use('/books', bookRouter);

app.listen(port, () => {
  console.log(`Server running!`)
});

module.exports = app;
