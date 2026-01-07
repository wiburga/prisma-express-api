import 'dotenv/config'
import app from './app'

const PORT = process.env.PORT || 3000

app.listen(Number(PORT), () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`)
})
