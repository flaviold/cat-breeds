import { BreedRepository } from '../../../src/api/repositories/breed-repository'
import { makeBreeds } from '../../mocks/mock-breed'
import env from '../../../src/config/env'

const makeSut = (): { sut: BreedRepository } => {
  const sut = new BreedRepository()

  return {
    sut
  }
}

describe('Breed Repository load', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should call fetchBreeds with correct params', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds')

    await sut.load()
    expect(spy).toHaveBeenCalledWith(undefined)

    await sut.load(11)
    expect(spy).toHaveBeenCalledWith(11)
  })

  it('should return a list of breeds on success', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    jest.spyOn(BreedRepository.prototype, 'fetchBreeds').mockImplementation(async () => await Promise.resolve(breeds))

    const result = await sut.load()
    expect(result).toBe(breeds)
  })
})

describe('Breed Repository loadByName', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should call fetchBreeds with correct params', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds')
    const name = 'name'

    await sut.loadByName(name)
    expect(spy).toHaveBeenCalledWith(undefined)

    await sut.loadByName(name, 11)
    expect(spy).toHaveBeenCalledWith(11)
  })

  it('should return a list of breeds filtered by name on success', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    breeds[0].name = 'BreedName1'
    breeds[1].name = 'BreedName2'
    jest.spyOn(BreedRepository.prototype, 'fetchBreeds').mockImplementation(async () => await Promise.resolve(breeds))

    const result = await sut.loadByName('BreedName')
    expect(result).toEqual([breeds[0], breeds[1]])
  })
})

describe('Breed Repository fetchBreeds', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should call fetch with correct params', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => makeBreeds() }))

    await sut.fetchBreeds()
    expect(spy).toHaveBeenCalledWith(`${env.catApiUrl}/breeds`, { headers: { 'x-api-key': env.catApiKey } })

    await sut.fetchBreeds(2)
    expect(spy).toHaveBeenCalledWith(`${env.catApiUrl}/breeds?limit=2`, { headers: { 'x-api-key': env.catApiKey } })
  })

  it('should return a list of breeds filtered by name on success', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => breeds }))

    const result = await sut.fetchBreeds()
    expect(result).toBe(breeds)
  })
})
