const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./auth-secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json({ message: 'Access denied: missing token' })
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Access denied: invalid token' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  }
};
