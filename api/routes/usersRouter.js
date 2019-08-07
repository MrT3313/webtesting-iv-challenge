// IMPORTS
    const express = require('express')

// KNEX version of DB
    const DB_KNEX = require('../../data/dbConfig.js')

// ROUTER
    const router = express.Router()

// - GET - //
    // - A - // All Users
    router.get('/', async (req,res) => {
        console.log('usersRouter GET/')

        DB_KNEX('USERS')
            .then( users => {
                console.log('users', users )
                res.status(200).json( users )
            })
            .catch( err => {
                res.status(500).json( { error: 'GET/ -> Could not get ALL users from USERS table'} )
            })
    })

// - POST - //
// - PUT - //
// - DEL - //

// EXPORTS 
    module.exports = router
