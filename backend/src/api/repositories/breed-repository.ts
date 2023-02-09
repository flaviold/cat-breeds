import { BreedRepositoryInterface } from '../core/interfaces/breed-repository-interface'
import { BreedModel } from '../core/models/breed-model'
import { redisHelper } from '../helpers/redis-helper'
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

    breeds = breeds.filter(i => i.name.toLowerCase().includes(name.toLowerCase()))

    if (limit != null) {
      breeds = breeds.slice(0, limit)
    }

    return breeds
  }

  async loadById (id: string): Promise<BreedModel> {
    return await this.fetchBreedById(id)
  }

  async fetchBreeds (): Promise<BreedModel[]> {
    let breeds = await redisHelper.get<BreedModel[]>('breeds')

    if (breeds) {
      return breeds
    }

    const result = await fetch(`${env.catApiUrl}/breeds`, {
      headers: {
        'x-api-key': env.catApiKey
      }
    })
    breeds = (await result.json()) as BreedModel[]

    await redisHelper.set('breeds', breeds)

    return breeds
  }

  async fetchBreedById (id: string): Promise<BreedModel> {
    let breed = (await redisHelper.get<BreedModel[]>('breeds'))?.find(b => b.id === id)

    if (breed) {
      return breed
    }

    const result = await fetch(`${env.catApiUrl}/breeds/${id}`, {
      headers: {
        'x-api-key': env.catApiKey
      }
    })
    breed = (await result.json()) as BreedModel

    return breed || null
  }
}
