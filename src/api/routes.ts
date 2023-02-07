import { Express, Request, RequestHandler, Response, Router } from 'express'
import { BaseController } from './controllers/interfaces/base-controller'
import { makeBreedListController } from './main/factories/breed-list-controller-factory'

const adaptRoute = (controller: BaseController<any>): RequestHandler => {
  return async (request: Request, response: Response) => {
    try {
      const result = await controller.handle(request)
      const status = result ? 200 : 204

      response.status(status).json(result)
    } catch {
      response.status(500).json({ error: 'internal server error' })
    }
  }
}

export const setupApiRoutes = (app: Express): void => {
  const router = Router()

  router.get('/breed', adaptRoute(makeBreedListController()))

  app.use('/api', router)
}
