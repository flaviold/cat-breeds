import { setupApiRoutes } from './api/routes'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors)

setupApiRoutes(app)

app.get('/', (req, res) => {
  res.send()
})

export default app
