// const jwt = require('jsonwebtoken');

// function auth(req, res, next) {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: 'Missing authentication token' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decodedToken.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid authentication token' });
//   }
// }

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({error: 'Unauthorized request'})
  }
}

module.exports = auth
