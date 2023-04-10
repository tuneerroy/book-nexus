function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({error: 'Unauthorized request'})
  }
}

module.exports = auth
