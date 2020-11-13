const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const { jwtSecret } = require('./auth-secrets')

const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
