const request = require('supertest')
const server = require('./server')

describe('server.js module', () => {
    test('testing environment is correct', () => {
        expect(process.env.DB_ENV).toBe('development')
        expect(process.env.DB_ENV).not.toBe('testing')
        expect(process.env.DB_ENV).not.toBe('production')
    })

    test('[GET] / endpoint works', () => {
        return request(server).get('/')
            .expect('Content-Type', /json/)
            .expect({ api: 'up' })
    })
})