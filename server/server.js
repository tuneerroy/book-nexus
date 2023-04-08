const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "/../.env") });

const express = require("express");
const bookRouter = require("./routes/Book");
const morgan = require("morgan");
// const { afterAll } = require('jest');

const app = express();
app.use(morgan("dev"));

const port = 8000;

app.use("/api/books", bookRouter);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

// afterAll(done => {
//   server.close(done);
// // });

// Stop the server when the process is terminated
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server stopped');
  });
});

module.exports = app;

