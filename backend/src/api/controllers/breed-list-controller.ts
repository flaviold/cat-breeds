import { BreedListLoadParams, BreedServiceInterface } from 'api/core/interfaces/breed-service-interface'
import { BreedModel } from 'api/core/models/breed-model'
import { Request } from 'express'
import { BaseController } from './interfaces/base-controller'

export class BreedListController implements BaseController<BreedModel[]> {
  constructor (
    private readonly breedService: BreedServiceInterface
  ) {}

  async handle (request: Request): Promise<BreedModel[]> {
    const param = this.mapParams(request)

    return await this.breedService.loadList(param)
  }

  mapParams (request: Request): BreedListLoadParams {
    return {
      limit: request.query?.limit ? Number(request.query?.limit) : null,
      name: request.query?.name as string
    }
  }
}
