const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Users = require("../userDb/users")

const router = express.Router()

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" })
  }

  const user = await Users.findOne({ username })
  if (!user) {
    return res.status(401).json({ error: "User not found" })
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" })
  }
  const token = createToken(user)
  res.json({ token })
})

router.post("/register", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password" })
    }
    const user = await Users.createAccount(username, password)
    const token = createToken(user)
    res.json({ token })
});

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "1h",
    })
}

module.exports = router
