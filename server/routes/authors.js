const express = require('express')
const router = express.Router()
const db = require('../db')
const helpers = require('../helpers');

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

/*
Query to get authors who write a given list of genres
Parameters:
  - including: include authors that write books of category on the list
  - excluding: exclude authors that write books of category on the list
  - andMode: if defined, requires that all (instead of any) categories are met
*/
router.get('/recommendations/category', (req, res) => {
  req.query.including ?? '';
  req.query.excluding ?? '';
  const includeList = req.query.including.split(',')
  const excludeList = req.query.excluding.split(',')
  const andMode = req.query.andMode
  const query = `
  WITH
    IncludedBooks AS (
      SELECT isbn, category
      FROM CategoryOf
      WHERE ${helpers.fColInList('category', includeList)}
    ),

    ExcludedBooks AS (
      SELECT isbn
      FROM CategoryOf
      WHERE ${helpers.fColInList('category', excludeList)}
    )

    SELECT *
    FROM (
      SELECT A.id, A.name
      FROM Author A
      JOIN WorkedOn W ON A.id = W.author_id
      NATURAL JOIN IncludedBooks I
      GROUP BY A.id, A.name
      HAVING ${andMode ? `COUNT(DISTINCT I.category) = ${includeList.length}` : `COUNT(*) > 0`}
      ORDER BY COUNT(*)) X
    WHERE X.id NOT IN (
      SELECT W.author_id AS id
      FROM ExcludedBooks E
      NATURAL JOIN WorkedOn W
      );`

    db.query(query, (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).send('DB Error')
      }
      res.json(results)
    })
})

module.exports = router
