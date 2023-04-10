const express = require('express')
const router = express.Router()
const db = require('../db')
// const helpers = require('../helpers');

router.get('/:id', (req, res) => {
  query = `SELECT name FROM Author WHERE id = ${req.params.id}`
  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    if (results.length === 0) return res.status(404).send('Author not found')
    res.json(results[0].name)
  })
})

module.exports = router
