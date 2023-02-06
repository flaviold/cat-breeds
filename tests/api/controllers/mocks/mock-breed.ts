import { BreedListLoadParams, BreedServiceInterface } from 'api/core/interfaces/breed-service-interface'
import { BreedModel, Image, Weight } from 'api/core/models/breed-model'

const makeImage = (): Image => ({
  height: 1,
  id: 'id',
  url: 'url',
  width: 1
})

const makeWeight = (): Weight => ({
  imperial: 'imperial',
  metric: 'metric'
})

const makeBreed = (): BreedModel => ({
  adaptability: 1,
  affectionLevel: 1,
  altNames: 'altNames',
  cfaUrl: 'cfaUrl',
  childFriendly: 1,
  countryCode: 'countryCode',
  countryCodes: 'countryCodes',
  description: 'description',
  dogFriendly: 1,
  energyLevel: 1,
  experimental: 1,
  grooming: 1,
  hairless: 1,
  healthIssues: 1,
  hypoallergenic: 1,
  id: 'id',
  image: makeImage(),
  indoor: 1,
  intelligence: 1,
  lifeSpan: 'lifeSpan',
  name: 'name',
  natural: 1,
  origin: 'origin',
  rare: 1,
  referenceImageId: 'referenceImageId',
  rex: 1,
  sheddingLevel: 1,
  shortLegs: 1,
  socialNeeds: 1,
  strangerFriendly: 1,
  suppressedTail: 1,
  temperament: 'temperament',
  vcahospitalsUrl: 'vcahospitalsUrl',
  vetstreetUrl: 'vetstreetUrl',
  vocalisation: 1,
  weight: makeWeight(),
  wikipediaUrl: 'wikipediaUrl'
})

const makeBreeds = (): BreedModel[] => ([
  makeBreed(),
  makeBreed(),
  makeBreed(),
  makeBreed(),
  makeBreed(),
  makeBreed()
])

export class BreedServiceSpy implements BreedServiceInterface {
  breedListLoadParams: BreedListLoadParams
  loadListResult: BreedModel[] = makeBreeds()

  async loadList (params: BreedListLoadParams): Promise<BreedModel[]> {
    this.breedListLoadParams = params

    return this.loadListResult
  }
}
