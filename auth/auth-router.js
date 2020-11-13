const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = require('express').Router();
const { jwtSecret } = require('./auth-secrets')
const Users = require('../users/user-model')

router.post('/register', async (req, res) => {
  try {
    const { password } = req.body
    const hash = bcrypt.hashSync(password, 10)
    const creds = { ...req.body, password: hash }
    const user = await Users.add(creds)
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message, stack: err.stack })
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Users.findBy({ username }).first()
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({ message: `Welcome ${user.username}`, token })
    } else {
      res.status(401).json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message, stack: err.stack })
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: 60 * 30
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
