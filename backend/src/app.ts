import { setupApiRoutes } from './api/routes'
import express from 'express'
import { cors } from './cors'

const app = express()

app.use(cors)
setupApiRoutes(app)

app.get('/', (req, res) => {
  res.send()
})

export default app
