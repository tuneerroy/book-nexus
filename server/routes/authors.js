const express = require("express");
const router = express.Router();
const db = require("../db");
const helpers = require("../helpers");

// route to get details of authors based on ids
// TODO: don't need categories, just id, name, and avg_rating
router.get("/details", (req, res) => {
  const query = `
    SELECT * FROM AuthorView WHERE ${helpers.fColInList("id", req.query.ids.split(","))}
    ${helpers.fGetPage(req.query.page, req.query.pageSize)};
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(";");
    });
    res.json(results);
  });
});

// TODO: i need id, name, list of categories their books cover, and avg_rating
router.get("/:id", (req, res) => {
  query = `SELECT * FROM AuthorView WHERE id = ${req.params.id}`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    if (results.length === 0) return res.status(404).send("Author not found");
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(";");
    });
    res.json(results[0].name);
  });
});

/*
Query to get authors who write a given list of genres
Parameters:
  - including: include authors that write books of category on the list
  - excluding: exclude authors that write books of category on the list
  - andMode: if defined, requires that all (instead of any) categories are met
*/
// TODO: don't need categories, just id, name, and avg_rating
router.get("/recommendations/category", (req, res) => {
  req.query.including ?? ""; // TODO: wtf is this for?
  req.query.excluding ?? "";
  const includeList = req.query.including.split(",");
  const excludeList = req.query.excluding.split(",");
  const andMode = req.query.andMode;
  const query = `
  WITH
    IncludedBooks AS (
      SELECT isbn, category
      FROM CategoryOf
      WHERE ${helpers.fColInList("category", includeList)}
    ),

    ExcludedBooks AS (
      SELECT isbn
      FROM CategoryOf
      WHERE ${helpers.fColInList("category", excludeList)}
    )

    SELECT X.id, X.name, X.avg_rating, X.categories
    FROM (
      SELECT A.id, A.name, A.avg_rating, A.categories, COUNT(*) as count
      FROM AuthorView A
      JOIN WorkedOn W ON A.id = W.author_id
      NATURAL JOIN IncludedBooks I
      GROUP BY A.id, A.name
      HAVING ${
        andMode
          ? `COUNT(DISTINCT I.category) = ${includeList.length}`
          : `COUNT(*) > 0`
      }
    ) X
    WHERE X.id NOT IN (
      SELECT W.author_id AS id
      FROM ExcludedBooks E
      NATURAL JOIN WorkedOn W
      )
    ORDER BY count DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)};`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(";");
    });
    res.json(results);
  });
});

/*
Recommends authors using a list of given authors
params:
  author_list: comma delimited list of given authors
*/
// TODO: don't need categories, just id, name, and avg_rating
router.get("/recommendations/authorList", (req, res) => {
  const authorList = req.query.authorList.split(",");
  const query = `
  WITH
    AuthorListIsbns AS (
        SELECT isbn
        FROM WorkedOn W
        WHERE ${helpers.fColInList("W.author_id", authorList)}
    ),

    Collabs AS (
        SELECT W.author_id, COUNT(*) collab_count
        FROM AuthorListIsbns I
        NATURAL JOIN WorkedOn W
        WHERE ${helpers.fColNotInList("W.author_id", authorList)}
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
        WHERE ${helpers.fColNotInList("A.id", authorList)}
        GROUP BY A.id
    )

    SELECT A.name, A.id, A.avg_rating, A.categories, P.priority
    FROM AuthorView A
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
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }
    results.forEach((result) => {
      result.categories = result.categories && result.categories.split(";");
    });
    res.json(results);
  });
});

module.exports = router;
