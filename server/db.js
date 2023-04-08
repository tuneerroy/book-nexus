const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '/../.env') });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
connection.connect((err) => err && console.log(err));

module.exports = connection;