import { BreedListController } from '../../controllers/breed-list-controller'
import { BaseController } from '../../controllers/interfaces/base-controller'
import { BreedService } from '../../core/breed-service'
import { BreedModel } from '../../core/models/breed-model'
import { BreedRepository } from '../../repositories/breed-repository'

export const makeBreedListController = (): BaseController<BreedModel[]> => {
  const breedRepository = new BreedRepository()
  const breedService = new BreedService(breedRepository)
  return new BreedListController(breedService)
}
