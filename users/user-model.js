const db = require('../database/dbConfig')

function find() {
    return db('users')
}

async function add(creds) {
    try {
        const [id] = await db('users').insert(creds)
        return find().where({ id }).first()
    } catch (err) {
        throw err
    }
}

module.exports = {
    find,
    add
}