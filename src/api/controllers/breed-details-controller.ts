import { BreedServiceInterface } from 'api/core/interfaces/breed-service-interface'
import { BreedModel } from 'api/core/models/breed-model'
import { Request } from 'express'
import { BaseController } from './interfaces/base-controller'

export class BreedDetailsController implements BaseController<BreedModel> {
  constructor (
    private readonly breedService: BreedServiceInterface
  ) {}

  async handle (request: Request): Promise<BreedModel> {
    const { id } = request.params

    return await this.breedService.loadDetails(id)
  }
}
