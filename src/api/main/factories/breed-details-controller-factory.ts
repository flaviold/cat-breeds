import { BreedDetailsController } from '../../controllers/breed-details-controller'
import { BaseController } from '../../controllers/interfaces/base-controller'
import { BreedService } from '../../core/breed-service'
import { BreedModel } from '../../core/models/breed-model'
import { BreedRepository } from '../../repositories/breed-repository'

export const makeBreedDetailsController = (): BaseController<BreedModel> => {
  const breedRepository = new BreedRepository()
  const breedService = new BreedService(breedRepository)
  return new BreedDetailsController(breedService)
}
