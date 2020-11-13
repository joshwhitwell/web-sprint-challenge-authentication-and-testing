const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(async () => {
    await db('users').truncate()
})

describe('auth-router.js module', () => {
    test('testing environment is correct', () => {
        expect(process.env.DB_ENV).toBe('testing')
        expect(process.env.DB_ENV).not.toBe('development')
        expect(process.env.DB_ENV).not.toBe('production')
    })

    test('[POST] /register returns new user', () => {
        return request(server).post('/api/auth/register')
            .send({ username: 'shannon', password: 'password' })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(res => {
                expect(res.body).toMatchObject({ id: 1, username: 'shannon' })
            })
    })

    test('[POST] /login returns token', async () => {
        await request(server).post('/api/auth/register')
            .send({ username: 'shannon', password: 'password' })
        return request(server).post('/api/auth/login')
            .send({ username: 'shannon', password: 'password' })
            .expect(200)
            .then(res => {
                expect(res.body.token).toBeDefined()
            })
    })
})