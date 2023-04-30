const express = require("express");
const router = express.Router();
const helpers = require("../helpers")
const db = require("../db");

router.get("/authors/:id", (req, res) => {
    const query = `
        SELECT *
        FROM Review R
        NATURAL JOIN WorkedOn W
        WHERE W.author_id = ${req.params.id}
        AND review IS NOT NULL
        ${helpers.fGetPage(req.query.page, req.query.pageSize)}
    `
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }
        res.json(results)
    })
})

router.get("/books/:id", (req, res) => {
    const query = `
        SELECT *
        FROM Review R
        WHERE R.isbn = ${req.params.id}
        AND review IS NOT NULL
        ${helpers.fGetPage(req.query.page, req.query.pageSize)}
        `
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }
        res.json(results)
    })
})

module.exports = router