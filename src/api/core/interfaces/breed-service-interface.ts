import { BreedModel } from '../models/breed-model'

export type BreedListLoadParams = {
  limit?: number
  name?: string
}

export interface BreedServiceInterface {
  loadList: (params: BreedListLoadParams) => Promise<BreedModel[]>
}
