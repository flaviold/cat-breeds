import { Express, Request, RequestHandler, Response, Router } from 'express'
import { BaseController } from './controllers/interfaces/base-controller'
import { makeBreedDetailsController, makeBreedListController } from './main/factories'

const adaptRoute = (controller: BaseController<any>): RequestHandler => {
  return async (request: Request, response: Response) => {
    try {
      const result = await controller.handle(request)
      const status = result ? 200 : 204

      response.status(status).json(result)
    } catch (error) {
      console.error(error)
      response.status(500).json({ error: 'internal server error' })
    }
  }
}

export const setupApiRoutes = (app: Express): void => {
  const router = Router()

  router.get('/breed', adaptRoute(makeBreedListController()))
  router.get('/breed/:id', adaptRoute(makeBreedDetailsController()))

  app.use('/api', router)
}
