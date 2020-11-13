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

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
