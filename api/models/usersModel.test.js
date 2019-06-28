const KNEX_DB = require('../../data/dbConfig.js')

const usersModel = require('./usersModel.js')

describe('the users model', () => {
    // Cleanup
    afterEach( async () => {
        await KNEX_DB('USERS').truncate()
    })

    describe('insert()', () => {
        it('should insert users into the db', async () => {
            // using our model method
                await usersModel.insert({ name: 'Tommy' })
                await usersModel.insert({ name: 'OUR LORD JESUS CHRIST' })
            // confirm with knex
                const users = await KNEX_DB('USERS')
    
            expect(users).toHaveLength(2)
            expect(users[0].name).toBe('Tommy')
        })
        it('should return the new user on insert', async () => {
            const user = await usersModel.insert({ name: 'Tommy'})
            expect(user).toEqual({ id: 1, name: 'Tommy'})
        })
    })
    describe('findByID()', () => {
        // Cleanup
        afterEach( async () => {
            await KNEX_DB('USERS').truncate()
        })

        it('should find the user by ID', async () => {
            await KNEX_DB('users').insert([
                {name: 'OUR LORD AND SAVIOR JESUS CHRIST'},
                {name: '^that guys dad'}
            ])

            const user_1 = await usersModel.findByID(1)
            const user_2 = await usersModel.findByID(2)

            expect(user_1.name).toBe('OUR LORD AND SAVIOR JESUS CHRIST')
            expect(user_2.name).toBe('^that guys dad')
        })
        it('returns undefined of invalid id', async () => {
            const user = await usersModel.findByID(2)
            expect(user).toBeUndefined()
        })
    })

    describe('remove()', () => {
        // Cleanup
        afterEach( async () => {
            await KNEX_DB('USERS').truncate()
        })

        it('should remove user from USERS table', async () => {
            await usersModel.remove([
                {name: 'OUR LORD AND SAVIOR JESUS CHRIST'},
            ])

            // confirm with KNEX
            const users = await KNEX_DB('USERS')
            
            expect(users).toHaveLength(0)
            expect(users).toEqual([])



        })
    })

})
