const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "/../.env") });

const express = require("express");
const accountsRouter = require("./routes/accounts");
const favoriteRouter = require("./routes/favorites");
const auth = require("./userDb/auth");
const bookRouter = require("./routes/books");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const port = 8000;

app.use("/api/auth", accountsRouter);
app.use("/api/favorites", auth, favoriteRouter);
app.use("/api/books", auth, bookRouter);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

module.exports = server;