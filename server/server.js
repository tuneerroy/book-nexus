const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: path.join(__dirname, '/../.env')})

const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')

const accountsRouter = require('./routes/accounts')
const favoriteRouter = require('./routes/favorites')
const bookRouter = require('./routes/books')
const auth = require('./auth/middleware')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({extended: true}))
app.use(
    require('express-session')({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
    }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(
    session({
      secret: 'test',
      resave: false,
      saveUninitialized: true,
    }),
)

app.use('/api/accounts', accountsRouter)
app.use('/api/favorites', favoriteRouter)
app.use('/api/books', bookRouter)

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

const port = process.env.PORT || 8000
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}!`)
})

module.exports = server
