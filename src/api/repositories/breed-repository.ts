import { BreedRepositoryInterface } from 'api/core/interfaces/breed-repository-interface'
import { BreedModel } from 'api/core/models/breed-model'
import env from '../../config/env'

export class BreedRepository implements BreedRepositoryInterface {
  async load (limit?: number): Promise<BreedModel[]> {
    const breeds = await this.fetchBreeds()

    if (limit == null) {
      return breeds
    } else {
      return breeds.slice(0, limit)
    }
  }

  async loadByName (name: string, limit?: number): Promise<BreedModel[]> {
    let breeds = await this.fetchBreeds()

    if (limit != null) {
      breeds = breeds.slice(0, limit)
    }

    return breeds.filter(i => i.name.toLowerCase().includes(name.toLowerCase()))
  }

  async fetchBreeds (): Promise<BreedModel[]> {
    const result = await fetch(`${env.catApiUrl}/breeds`, {
      headers: {
        'x-api-key': env.catApiKey
      }
    })
    const breeds = (await result.json()) as BreedModel[]

    return breeds
  }
}
