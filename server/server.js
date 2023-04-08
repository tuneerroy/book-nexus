const express = require("express");
const bookRouter = require("./routes/Book");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

const port = 8000;

app.use("/api/books", bookRouter);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

afterAll(done => {
  server.close(done);
});

module.exports = app;
