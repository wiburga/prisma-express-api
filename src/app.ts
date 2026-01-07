import express, { Application } from 'express'
import userRoutes from './routes/user.routes'
import errorHandler from './middlewares/errorHandler'

const app: Application = express()

// Middlewares
app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  
  next()
})

// Rutas de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API iniciada. Listo para construir 🚀' })
})

// Rutas de usuarios
app.use('/api/users', userRoutes)

// Error handler
app.use(errorHandler)

export default app
