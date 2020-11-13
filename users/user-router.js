const router = require('express').Router()

const Users = require('./user-model')

router.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json({ data: users })
    } catch (err) {
        res.status(500).json({ message: err.message, stack: err.stack })
    }
})

module.exports = router