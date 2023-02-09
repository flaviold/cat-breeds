import { BreedRepository } from '../../../src/api/repositories/breed-repository'
import { makeBreed, makeBreeds } from '../../mocks/mock-breed'
import { redisHelper } from '../../../src/api/helpers/redis-helper'
import env from '../../../src/config/env'

const makeSut = (): { sut: BreedRepository } => {
  const sut = new BreedRepository()

  return {
    sut
  }
}

const mockRedis = (): any => {
  jest.spyOn(redisHelper, 'get').mockImplementation(() => null)
  jest.spyOn(redisHelper, 'set').mockImplementation((key: string, value: any): any => null)
}

describe('Breed Repository load', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    mockRedis()
  })

  it('should call fetchBreeds', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds').mockImplementation(async () => await Promise.resolve(null))

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
    mockRedis()
  })

  it('should call fetchBreeds', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds').mockImplementation(async () => await Promise.resolve([]))
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
    mockRedis()
  })

  it('should call fetchBreedById', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreedById').mockImplementation(async () => await Promise.resolve(null))
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
    mockRedis()
  })

  it('should call redisHelper get with correct params', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(redisHelper, 'get').mockImplementation((): any => makeBreeds())

    await sut.fetchBreeds()

    expect(spy).toHaveBeenCalledWith('breeds')
  })

  it('should not call fetch when cache is found', async () => {
    const { sut } = makeSut()
    jest.spyOn(redisHelper, 'get').mockImplementation((): any => makeBreeds())
    const spy = jest.spyOn(global, 'fetch')

    await sut.fetchBreeds()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should call fetch with correct params when no cache is found', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => makeBreeds() }))

    await sut.fetchBreeds()
    expect(spy).toHaveBeenCalledWith(`${env.catApiUrl}/breeds`, { headers: { 'x-api-key': env.catApiKey } })
  })

  it('should call redisHelper set with correct params when no cache is found', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    const spy = jest.spyOn(redisHelper, 'set').mockImplementation((): any => null)
    jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => breeds }))

    await sut.fetchBreeds()

    expect(spy).toHaveBeenCalledWith('breeds', breeds)
  })

  it('should return a list of breeds on success', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => breeds }))

    const result = await sut.fetchBreeds()
    expect(result).toBe(breeds)
  })

  it('should return a list of cached breeds on success', async () => {
    const { sut } = makeSut()
    const breeds = makeBreeds()
    jest.spyOn(redisHelper, 'get').mockImplementation((): any => breeds)
    jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => null }))

    const result = await sut.fetchBreeds()
    expect(result).toBe(breeds)
  })
})

describe('Breed Repository fetchBreedsById', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    mockRedis()
  })

  it('should call redisHelper get with correct params', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(redisHelper, 'get').mockImplementation((): any => makeBreeds())

    await sut.fetchBreedById('id')

    expect(spy).toHaveBeenCalledWith('breeds')
  })

  it('should not call fetch when cache is found', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => makeBreeds() }))
    jest.spyOn(redisHelper, 'get').mockImplementation((): any => makeBreeds())

    await sut.fetchBreedById('id')

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should call fetch with correct params when cache is not found', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => makeBreeds() }))
    const id = 'id'
    jest.spyOn(redisHelper, 'get').mockImplementation((): any => null)

    await sut.fetchBreedById(id)

    expect(spy).toHaveBeenCalledWith(`${env.catApiUrl}/breeds/${id}`, { headers: { 'x-api-key': env.catApiKey } })
  })

  it('should return cached breed if found', async () => {
    const { sut } = makeSut()
    const id = 'test_id'
    const breeds = makeBreeds()
    breeds[0].id = id
    jest.spyOn(redisHelper, 'get').mockImplementation((): any => breeds)

    const result = await sut.fetchBreedById(id)
    expect(result).toBe(breeds[0])
  })

  it('should return breed on success', async () => {
    const { sut } = makeSut()
    const id = 'test_id'
    const breed = makeBreed()
    jest.spyOn(global, 'fetch').mockImplementation((): any => ({ json: () => breed }))
    jest.spyOn(redisHelper, 'get').mockImplementation((): any => null)

    const result = await sut.fetchBreedById(id)
    expect(result).toBe(breed)
  })
})
