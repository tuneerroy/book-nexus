const mysql = require("mysql");
const { afterAll } = require('jest');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
connection.connect((err) => err && console.log(err));

process.on("exit", () => {
  connection.end();
});

// afterAll(done => {
//   connection.end(done);
// });

module.exports = connection;
