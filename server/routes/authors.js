const express = require('express')
const router = express.Router()
const db = require('../db')
const helpers = require('../helpers');

// route to get details of authors based on ids
router.get('/details', (req, res) => {
  const query = `
    WITH DesiredAuthors AS (
      SELECT id as author_id, name
      FROM Author
      WHERE ${helpers.fColInList("id", req.query.ids.split(","))}
    ),
    BookCategory AS (
      SELECT isbn, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories
      FROM Book
      NATURAL JOIN CategoryOf
      GROUP BY isbn
    )
    SELECT author_id as id, name, AVG(rating) AS avg_rating, GROUP_CONCAT(DISTINCT categories SEPARATOR ';') AS categories
    FROM DesiredAuthors
    NATURAL LEFT JOIN WorkedOn
    NATURAL LEFT JOIN BookCategory
    NATURAL LEFT JOIN Review
    GROUP BY author_id, name
    ${helpers.fGetPage(req.query.page, req.query.pageSize)};
  `

  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(';')
    })
    res.json(results)
  })
})

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
  req.query.including ?? ''; // TODO: wtf is this for?
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

    SELECT X.id, X.name
    FROM (
      SELECT A.id, A.name, COUNT(*) as count
      FROM Author A
      JOIN WorkedOn W ON A.id = W.author_id
      NATURAL JOIN IncludedBooks I
      GROUP BY A.id, A.name
      HAVING ${andMode ? `COUNT(DISTINCT I.category) = ${includeList.length}` : `COUNT(*) > 0`}
    ) X
    WHERE X.id NOT IN (
      SELECT W.author_id AS id
      FROM ExcludedBooks E
      NATURAL JOIN WorkedOn W
      )
    ORDER BY count DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)};`

    db.query(query, (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).send('DB Error')
      }
      res.json(results)
    })
})

/*
Recommends authors using a list of given authors
params:
  author_list: comma delimited list of given authors
*/

router.get('/recommendations/authorList', (req, res) => {
  const authorList = req.query.authorList.split(',')
  const query = `
  WITH
    AuthorListIsbns AS (
        SELECT isbn
        FROM WorkedOn W
        WHERE ${helpers.fColInList('W.author_id', authorList)}
    ),

    Collabs AS (
        SELECT W.author_id, COUNT(*) collab_count
        FROM AuthorListIsbns I
        NATURAL JOIN WorkedOn W
        WHERE ${helpers.fColNotInList('W.author_id', authorList)}
        GROUP BY W.author_id
    ),

    GenreMatches AS (
        SELECT A.id AS author_id, COUNT(DISTINCT C.category) AS genre_matches
        #Get the categories that the author has worked on
        FROM (SELECT DISTINCT C.category
          	FROM CategoryOf C NATURAL JOIN AuthorListIsbns
     	   ) AuthorListCategories
        NATURAL JOIN CategoryOf C
        JOIN WorkedOn W ON C.isbn = W.isbn
        JOIN Author A ON W.author_id = A.id
        WHERE ${helpers.fColNotInList('A.id', authorList)}
        GROUP BY A.id
    )

    SELECT A.name, A.id, P.priority
    FROM Author A
    NATURAL JOIN (
        SELECT
            author_id AS id,
            COALESCE(C.collab_count, 0) +
            COALESCE(G.genre_matches, 0)
            AS priority
        FROM
        GenreMatches G NATURAL LEFT JOIN Collabs C
    ) P
    ORDER BY priority DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)}
    ;
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    res.json(results)
  })

})

module.exports = router
