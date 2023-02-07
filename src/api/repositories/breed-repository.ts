import { BreedRepositoryInterface } from 'api/core/interfaces/breed-repository-interface'
import { BreedModel } from 'api/core/models/breed-model'
import env from '../../config/env'

export class BreedRepository implements BreedRepositoryInterface {
  async load (limit?: number): Promise<BreedModel[]> {
    return await this.fetchBreeds(limit)
  }

  async loadByName (name: string, limit?: number): Promise<BreedModel[]> {
    const breeds = await this.fetchBreeds(limit)

    return breeds.filter(i => i.name.toLowerCase().includes(name.toLowerCase()))
  }

  async fetchBreeds (limit?: number): Promise<BreedModel[]> {
    let query: string = ''

    if (limit) {
      query = `?limit=${limit}`
    }

    const result = await fetch(`${env.catApiUrl}/breeds${query}`, {
      headers: {
        'x-api-key': env.catApiKey
      }
    })
    const breeds = (await result.json()) as BreedModel[]

    return breeds
  }
}
