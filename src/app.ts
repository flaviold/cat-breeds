import { setupApiRoutes } from './api/routes'
import express from 'express'

const app = express()

setupApiRoutes(app)

app.get('/', (req, res) => {
  res.send()
})

export default app
