const express = require('express')
const router = express.Router()
const db = require('../db')
const helpers = require('../helpers')

// TODO: remove this eventually
router.get('/test', (req, res) => {
  const query = `
    SELECT * FROM Book
    LIMIT 10
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    res.json(results)
  })
})

// get all books with filters
router.get('/', (req, res) => {
  const query = `
    SELECT isbn, title, image_link, 
      GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories, 
      GROUP_CONCAT(DISTINCT CONCAT(author_id, '|', name) SEPARATOR ';') AS authors, 
      AVG(rating) AS rating
    FROM Book NATURAL LEFT JOIN CategoryOf NATURAL LEFT JOIN WorkedOn LEFT JOIN Author ON author_id=id NATURAL LEFT JOIN Review
    WHERE ${helpers.fColInList('category', req.query.categories)}
      AND ${helpers.fColInList('name', req.query.authors)}
      AND ${helpers.fColInRange(
      'year',
      req.query.year_low,
      req.query.year_high,
  )}
    GROUP BY isbn
      HAVING ${helpers.fColInRange(
      'AVG(rating)',
      req.query.rating_low,
      req.query.rating_high,
  )}
    ORDER BY AVG(rating) DESC, COUNT(rating) DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)}
  `
  console.log(query)

  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(';')
      result.authors = result.authors && result.authors.split(';').map((author) => {
        const [id, name] = author.split('|')
        return {id, name}
      })
    })
    res.json(results)
  })
})

//route for books that match a given set of keywords (for search functionality)
router.get('/search', (req, res) => {
  const keywords = req.query.keywords
  console.log("keyword");
  const query = `
  WITH
    TitleMatches AS (
      SELECT isbn, MATCH(title) AGAINST ('${keywords}') AS matches
      FROM Book
      WHERE MATCH(title) AGAINST ('${keywords}')
      GROUP BY isbn
    ),

    DescriptionMatches AS (
      SELECT isbn, MATCH(description) AGAINST ('${keywords}') AS matches
      FROM Book
      WHERE MATCH(description) AGAINST ('${keywords}')
      GROUP BY isbn
    ),

    ReviewMatches AS (
      SELECT isbn, AVG(MATCH(review) AGAINST ('${keywords}')) AS matches
      FROM Review
      GROUP BY isbn
      HAVING AVG(MATCH(review) AGAINST ('${keywords}')) > 0
    ),

    TotalPriority AS (
      SELECT B.isbn,
              COALESCE(T.matches, 0) * 5
                  + COALESCE(R.matches, 0) * 2
                  + COALESCE(D.matches, 0) AS Priority
      FROM Book B
      LEFT JOIN TitleMatches T
      ON B.isbn = T.isbn
      LEFT JOIN ReviewMatches R
      ON B.isbn = R.isbn
      LEFT JOIN DescriptionMatches D
      ON B.isbn = D.isbn
    )

    SELECT *
    FROM Book B NATURAL JOIN TotalPriority
    ORDER BY priority DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)};
  `

  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(';')
      result.authors = result.authors && result.authors.split(';')
    })
    res.json(results)
  })

})

// const query = `
// SELECT isbn, title, year, description, image_link, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories, GROUP_CONCAT(DISTINCT name SEPARATOR ';') AS authors, AVG(rating) AS rating, COUNT(rating) AS num_reviews
// FROM Book NATURAL JOIN CategoryOf NATURAL JOIN WorkedOn JOIN Author ON author_id=id NATURAL JOIN Review
// WHERE isbn = '${req.params.isbn}'
// `;

// get book details by isbn
router.get('/:isbn', (req, res) => {
  const query = `
    SELECT isbn, title, year, description, image_link, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories, GROUP_CONCAT(DISTINCT CONCAT(author_id, '|', name) SEPARATOR ';') AS authors, AVG(rating) AS rating, COUNT(rating) AS num_reviews
    FROM Book NATURAL LEFT JOIN CategoryOf NATURAL LEFT JOIN WorkedOn LEFT JOIN Author ON author_id=id NATURAL LEFT JOIN Review
    WHERE isbn = '${req.params.isbn}'
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    if (results.length === 0) return res.status(404).send('Book not found')
    results[0].categories =
      results[0].categories && results[0].categories.split(';')
    results[0].authors =
      results[0].authors &&
      results[0].authors.split(';').map((author) => {
        const [id, name] = author.split('|')
        return {id, name}
      })
    //console.log(results[0])
    res.json(results[0])
  })
})

// get book nonempty reviews by isbn
router.get('/:isbn/reviews', (req, res) => {
  const query = `
    SELECT reviewer_id, rating, review, review_source FROM Review
    WHERE isbn = '${req.params.isbn}' AND review != ''
    ORDER BY rating DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)}
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    res.json(results)
  })
})

// route for recommendations based off of list of books (isbns) and categories
router.get('/recommendations/category', (req, res) => {
  const query = `
    WITH GenrePreferences AS (
          SELECT category, COUNT(*) AS genre_preference
          FROM CategoryOf
          WHERE ${helpers.fColInList('isbn', req.query.books)}
          GROUP BY category
    ), RecIsbn AS (
          SELECT isbn, SUM(genre_preference) AS book_preference
          FROM CategoryOf NATURAL JOIN GenrePreferences
          GROUP BY isbn
    )
    SELECT isbn, title, description, image_link, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories, GROUP_CONCAT(DISTINCT name SEPARATOR ';') AS authors, AVG(rating) AS rating, COUNT(rating) AS test
    FROM Book NATURAL JOIN RecIsbn NATURAL JOIN CategoryOf NATURAL JOIN WorkedOn JOIN Author ON author_id=id NATURAL JOIN Review
    GROUP BY isbn
    ORDER BY book_preference DESC, COUNT(rating) DESC, AVG(rating) DESC
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('DB Error')
    }
    results.forEach((result) => {
      result.categories = result.categories.split(';')
      result.authors = result.authors.split(';')
    })
    res.json(results)
  })
})

// route for recommendations based off of similar authors to a list of books

module.exports = router
