import express from 'express'
import lectureRoutes from './routes/lectureRoutes'

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

// Register routes
app.use('/api', lectureRoutes)

// Error handling for undefined routes
app.use((_, res) => {
  res.status(404).json({ error: 'Route not found' })
})

export default app
