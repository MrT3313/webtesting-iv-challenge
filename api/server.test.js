const supertest = require('supertest')

const server = require('./server.js')
const KNEX_DB = require('./../data/dbConfig.js')

describe('server.js', () => {
    it('should set the test env to TESTING', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('GET /', () => {
        it('should return 200', () => {
            return supertest(server)
                .get('/')
                .then( res => {
                    expect(res.status).toBe(200)
                })
        })
        it('should return 200 using async/await', async () => {
            const res = await supertest(server).get('/')
            expect(res.status).toBe(200)
        })
        it('should return 200 checking res.type with async await', async () => {
                const res = await supertest(server).get('/')
                expect(res.type).toBe('application/json')
        })
    })
    describe('GET /api/users', () => {
        afterEach(async () => {
            await KNEX_DB('USERS').truncate()
        })

        it('should hit endpoint & return USERS', async () => {
            const res = await supertest(server).get('/api/users')
            expect(res.status).toBe(200)
            expect(res.body).toEqual([])
        })

        it('should return all users', async () => {
            const users = [
                {name: "John"},
                {name: "Timmy"}
            ]
            const usersIDs = users.map((user, i) => {
                return { name: user.name, id: i+1}
            })
            
            await KNEX_DB('USERS').insert(users)

            const res = await supertest(server).get('/api/users')
            expect(res.status).toBe(200)
            expect(res.body).toEqual(usersIDs)
        })
    })
})