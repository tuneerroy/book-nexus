const express = require("express")
const router = express.Router()
const db = require("../db")
const helpers = require("../helpers")

router.get("/categories", (req, res) => {
  const query = `
    SELECT category, COUNT(*) as count
    FROM CategoryOf
    GROUP BY category
    ORDER BY count DESC
    ${helpers.fGetPage(req.query.page, req.query.pageSize)}
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send("DB Error")
    }
    res.json(results)
  })
})
