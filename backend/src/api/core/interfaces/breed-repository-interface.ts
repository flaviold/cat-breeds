import { BreedModel } from '../models/breed-model'

export interface BreedRepositoryInterface {
  load: (limit?: number) => Promise<BreedModel[]>
  loadByName: (name: string, limit?: number) => Promise<BreedModel[]>
  loadById: (id: string) => Promise<BreedModel>
}
