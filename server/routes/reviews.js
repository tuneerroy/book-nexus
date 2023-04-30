const express = require("express");
const router = express.Router();
const db = require("../db");
const helpers = require("../helpers");

router.get("/author/:id", (req, res) => {
    const query = `
        SELECT *
        FROM Review R
        NATURAL JOIN WorkedOn W
        WHERE W.author_id = ${req.params.id}
        AND review IS NOT NULL
    `
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }
        res.json(results)
    })
})

router.get("/book/:id", (req, res) => {
    const query = `
        SELECT *
        FROM Review R
        WHERE R.isbn = ${req.params.id}
        AND review IS NOT NULL`
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }
        res.json(results)
    })
})

module.exports = router