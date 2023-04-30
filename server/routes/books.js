const express = require("express");
const router = express.Router();
const db = require("../db");
const helpers = require("../helpers");

router.get("/random", (req, res) => {
  const query = `
    SELECT * FROM Book
    ORDER BY RAND()
    LIMIT 30;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    res.json(results);
  });
});

// get all books with filters
router.get("/", (req, res) => {
  const query = `
  WITH books_wanted AS (
    SELECT DISTINCT isbn, title, image_link
    FROM Book NATURAL LEFT JOIN CategoryOf NATURAL LEFT JOIN WorkedOn JOIN Author ON author_id=id
    WHERE ${helpers.fColInList("category", req.query.categories)}
      AND ${helpers.fColInList("name", req.query.authors)}
      AND ${helpers.fColInRange(
        "year",
        req.query.year_low,
        req.query.year_high
      )}
  ), categories_agg AS (
    SELECT isbn, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories
    FROM books_wanted NATURAL LEFT JOIN CategoryOf
    GROUP BY isbn
  ), authors_agg AS (
    SELECT isbn, GROUP_CONCAT(DISTINCT CONCAT(author_id, '|', name) SEPARATOR ';') AS authors
    FROM books_wanted NATURAL LEFT JOIN WorkedOn LEFT JOIN Author ON author_id=id
    GROUP BY isbn
  ), rating_agg AS (
    SELECT isbn, AVG(rating) AS rating, COUNT(rating) AS num_reviews
    FROM books_wanted NATURAL LEFT JOIN Review
    GROUP BY isbn
    HAVING ${helpers.fColInRange(
      "rating",
      req.query.rating_low,
      req.query.rating_high
    )}
  ) SELECT * FROM books_wanted NATURAL LEFT JOIN categories_agg NATURAL LEFT JOIN authors_agg NATURAL LEFT JOIN rating_agg
  ORDER BY rating DESC, num_reviews DESC
  ${helpers.fGetPage(req.query.page, req.query.pageSize)}
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(";");
      result.authors =
        result.authors &&
        result.authors.split(";").map((author) => {
          const [id, name] = author.split("|");
          return { id, name };
        });
    });
    res.json(results);
  });
});

// get all details for books with given isbsn
router.get("/details", (req, res) => {
  const query = `
    SELECT isbn, title, image_link, 
      GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories, 
      GROUP_CONCAT(DISTINCT CONCAT(author_id, '|', name) SEPARATOR ';') AS authors, 
      AVG(rating) AS rating
    FROM Book NATURAL LEFT JOIN CategoryOf NATURAL LEFT JOIN WorkedOn LEFT JOIN Author ON author_id=id NATURAL LEFT JOIN Review
    WHERE ${helpers.fColInList("isbn", req.query.isbns.split(","))} 
    GROUP BY isbn
    ORDER BY AVG(rating) DESC, COUNT(rating) DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)}
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(";");
      result.authors =
        result.authors &&
        result.authors.split(";").map((author) => {
          const [id, name] = author.split("|");
          return { id, name };
        });
    });
    res.json(results);
  });
});

// route for books that match a given set of keywords (for search functionality)
router.get("/search", (req, res) => {
  const keywords = req.query.keywords;
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
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(";");
      result.authors = result.authors && result.authors.split(";");
    });
    res.json(results);
  });
});

// const query = `
// SELECT isbn, title, year, description, image_link, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories, GROUP_CONCAT(DISTINCT name SEPARATOR ';') AS authors, AVG(rating) AS rating, COUNT(rating) AS num_reviews
// FROM Book NATURAL JOIN CategoryOf NATURAL JOIN WorkedOn JOIN Author ON author_id=id NATURAL JOIN Review
// WHERE isbn = '${req.params.isbn}'
// `;

// get book details by isbn
router.get("/:isbn", (req, res) => {
  const query = `
    SELECT isbn, title, year, description, image_link, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories, GROUP_CONCAT(DISTINCT CONCAT(author_id, '|', name) SEPARATOR ';') AS authors, AVG(rating) AS rating, COUNT(rating) AS num_reviews
    FROM Book NATURAL LEFT JOIN CategoryOf NATURAL LEFT JOIN WorkedOn LEFT JOIN Author ON author_id=id NATURAL LEFT JOIN Review
    WHERE isbn = '${req.params.isbn}'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    if (results.length === 0) return res.status(404).send("Book not found");
    results[0].categories =
      results[0].categories && results[0].categories.split(";");
    results[0].authors =
      results[0].authors &&
      results[0].authors.split(";").map((author) => {
        const [id, name] = author.split("|");
        return { id, name };
      });
    res.json(results[0]);
  });
});

// get book nonempty reviews by isbn
router.get("/:isbn/reviews", (req, res) => {
  const query = `
    SELECT reviewer_id, rating, review, review_source FROM Review
    WHERE isbn = '${req.params.isbn}' AND review != ''
    ORDER BY rating DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)}
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    res.json(results);
  });
});

// route for recommendations based off of list of books (isbns) - uses categories in bg
router.get("/recommendations/category", (req, res) => {
  const query = `
  WITH GenrePreferences AS (
    SELECT category, COUNT(*) AS genre_preference
    FROM CategoryOf
    WHERE ${helpers.fColInList("isbn", req.query.books.split(","))}
    GROUP BY category
  ), RecIsbn AS (
      SELECT isbn, SUM(genre_preference) AS book_preference
      FROM CategoryOf NATURAL LEFT JOIN GenrePreferences
      GROUP BY isbn
  ), books_wanted AS (
    SELECT DISTINCT isbn, title, image_link, book_preference, AVG(rating) AS rating, COUNT(rating) AS num_reviews
    FROM Book NATURAL JOIN RecIsbn NATURAL LEFT JOIN Review
    GROUP BY isbn
    ORDER BY book_preference DESC, rating DESC, num_reviews DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)}
  ), categories_agg AS (
    SELECT isbn, GROUP_CONCAT(DISTINCT category SEPARATOR ';') AS categories
    FROM books_wanted NATURAL LEFT JOIN CategoryOf
    GROUP BY isbn
  ), authors_agg AS (
    SELECT isbn, GROUP_CONCAT(DISTINCT CONCAT(author_id, '|', name) SEPARATOR ';') AS authors
    FROM books_wanted NATURAL LEFT JOIN WorkedOn LEFT JOIN Author ON author_id=id
    GROUP BY isbn
  ) SELECT * FROM books_wanted NATURAL LEFT JOIN categories_agg NATURAL LEFT JOIN authors_agg;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    results.forEach((result) => {
      result.categories = result.categories?.split(";");
      result.authors = result.authors?.split(";");
    });
    res.json(results);
  });
});

// route for recommendations based off of similar authors to a list of books

module.exports = router;
