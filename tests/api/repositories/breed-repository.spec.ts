import { BreedRepository } from '../../../src/api/repositories/breed-repository'
import { makeBreed, makeBreeds } from '../../mocks/mock-breed'
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

  it('should call fetchBreeds', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds')

    await sut.load()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should return a list of breeds on success', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    jest.spyOn(BreedRepository.prototype, 'fetchBreeds').mockImplementation(async () => await Promise.resolve(breeds))

    let result = await sut.load()
    expect(result).toBe(breeds)

    result = await sut.load(3)
    expect(result).toEqual(breeds.slice(0, 3))
  })
})

describe('Breed Repository loadByName', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should call fetchBreeds', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds')
    const name = 'name'

    await sut.loadByName(name, 11)
    expect(spy).toHaveBeenCalledTimes(1)
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

describe('Breed Repository loadById', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should call fetchBreedById', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreedById')
    const id = 'id'

    await sut.loadById(id)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should return a breed filtered by id on success', async () => {
    const { sut } = makeSut()
    const breed = makeBreed()
    jest.spyOn(BreedRepository.prototype, 'fetchBreedById').mockImplementation(async () => await Promise.resolve(breed))

    const result = await sut.loadById('id')
    expect(result).toBe(breed)
  })

  it('should return null if id is not found', async () => {
    const { sut } = makeSut()
    jest.spyOn(BreedRepository.prototype, 'fetchBreedById').mockImplementation(async () => await Promise.resolve(null))

    const result = await sut.loadById('id')
    expect(result).toBeNull()
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
  })

  it('should return a list of breeds filtered by name on success', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => breeds }))

    const result = await sut.fetchBreeds()
    expect(result).toBe(breeds)
  })
})
