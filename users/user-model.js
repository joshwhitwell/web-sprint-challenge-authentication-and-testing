const db = require('../database/dbConfig')

function find() {
    return db('users')
}

module.exports = {
    find
}