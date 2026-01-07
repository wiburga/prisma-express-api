const express = require('express')
require('dotenv').config()

const userRoutes = require('./src/routes/user.routes')

const app = express()
app.use(express.json())

app.use('/users', userRoutes)

app.listen(3000, () => {
  console.log('🚀 API corriendo en http://localhost:3000')
})
