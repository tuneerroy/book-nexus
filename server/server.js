const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "/../.env") });

const express = require("express");
const morgan = require("morgan");
const accountsRouter = require("./routes/accounts");
const favoriteRouter = require("./routes/favorites");
const bookRouter = require("./routes/books");
const auth = require("./auth/middleware");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}))

app.use("/api/auth", accountsRouter);
app.use("/api/favorites", auth, favoriteRouter);
app.use("/api/books", auth, bookRouter);

const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

module.exports = server;