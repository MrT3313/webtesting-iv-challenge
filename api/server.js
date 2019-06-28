// EXPRESS
    const express = require('express')

// ROUTERS
    const usersRouter = require('./routes/usersRouter.js')

// SERVER
    const server = express()
    server.use(express.json())

// HOMEPAGE ROUTING
    server.get('/', (req,res) => {
        res.json({ message: 'Web Testing 4 Is Working!'})
    })

// INDIVIDUAL ROUTES
    server.use('/api/users', usersRouter)

// EXPORTS
    module.exports = server