const mysql = require("mysql")

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

connection.on("connect", (err) => {
  if (err) {
    console.error("Error when connecting to MySQL:", err)
  } else {
    console.log("Connected to MySQL!")
  }
})

module.exports = connection
