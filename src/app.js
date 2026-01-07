const express = require('express')
const userRoutes = require('./routes/user.routes')

const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)

module.exports = app
