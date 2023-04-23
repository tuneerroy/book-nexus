const express = require('express')
const User = require('../userDb/User')

const router = express.Router()

router.get('/', async (req, res) => {
  const user = await User.findOne({email: req.user.email})
  res.json({
    books: user.books,
    authors: user.authors,    
  })
})

router.get('/books', async (req, res) => {
  const user = await User.findOne({email: req.user.email})
  res.json({books: user.books})
})

router.post('/books', async (req, res) => {
  const user = await User.findOne({email: req.user.email})
  if (!user.books.includes(req.body.book)) {
    user.books.push(req.body.book)
    await user.save()
  }
  res.json({books: user.books})
})

router.delete('/books', async (req, res) => {
  const user = await User.findOne({email: req.user.email})
  if (user.books.includes(req.body.book)) {
    user.books = user.books.filter((book) => book !== req.body.book)
    await user.save()
  }
  res.json({books: user.books})
})

router.get('/authors', async (req, res) => {
  const user = await User.findOne({email: req.user.email})
    res.json({authors: user.authors})
})

router.post('/authors', async (req, res) => {
  const user = await User.findOne({email: req.user.email})
  if (!user.authors.includes(req.body.author)) {
    user.authors.push(req.body.author)
    await user.save()
  }
  res.json({authors: user.authors})
})

router.delete('/authors', async (req, res) => {
  const user = await User.findOne({email: req.user.email})
  if (user.authors.includes(req.body.author)) {
    user.authors = user.authors.filter((author) => author !== req.body.author)
    await user.save()
  }
  res.json({authors: user.authors})
})

router.get('/books/:title', async (req, res) => {
  const users = await User.find({books: req.params.title})
  res.json({count: users.length})
})

module.exports = router
