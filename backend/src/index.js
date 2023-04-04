const dotenv = require('dotenv');
const express = require('express');
const mysql = require('mysql');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '/../../.env') });

const app = express();
const port = 3000

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) throw err;
  console.log('DB Connected.');
});

app.listen(port, () => {
  console.log(`Site: http://localhost:${port}`);
});

app.get('/test', (req, res) => {
  res.send('YO!');
})

app.get('/books', (req, res) => {
  connection.query('SELECT * FROM Book', (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).send('RIPPP');
    }
    res.json(results);
  });
});;

app.get('/authors', (req, res) => {
  connection.query('SELECT * FROM Author', (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).send('RIPPP x2');
    }
    res.json(results);
  });
});