import { BreedListLoadParams, BreedServiceInterface } from 'api/core/interfaces/breed-service-interface'
import { BreedModel } from 'api/core/models/breed-model'
import { Request } from 'express'
import { BaseController } from './interfaces/base-controller'

export class BreedListController implements BaseController<BreedModel[]> {
  constructor (
    private readonly breedListController: BreedServiceInterface
  ) {}

  async handle (request: Request): Promise<BreedModel[]> {
    const param = this.mapParams(request)

    return await this.breedListController.loadList(param)
  }

  mapParams (request: Request): BreedListLoadParams {
    return {
      limit: Number(request.query?.limit ?? 5),
      name: request.query?.name as string
    }
  }
}
