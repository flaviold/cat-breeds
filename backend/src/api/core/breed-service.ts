import { BreedRepositoryInterface } from './interfaces/breed-repository-interface'
import { BreedListLoadParams, BreedServiceInterface } from './interfaces/breed-service-interface'
import { BreedModel } from './models/breed-model'

export class BreedService implements BreedServiceInterface {
  constructor (
    private readonly breedRepository: BreedRepositoryInterface
  ) {}

  async loadList (params: BreedListLoadParams): Promise<BreedModel[]> {
    const { limit, name, randomize } = params
    const breeds = await (params.name
      ? this.breedRepository.loadByName(name, randomize, limit)
      : this.breedRepository.load(randomize, limit))

    return breeds
  }

  async loadDetails (id: string): Promise<BreedModel> {
    return await this.breedRepository.loadById(id)
  }
}
