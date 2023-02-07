import { BreedService } from '../../../src/api/core/breed-service'
import { BreedRepositorySpy } from '../../mocks/mock-breed'

const makeSut = (): { sut: BreedService, breedRepositorySpy: BreedRepositorySpy } => {
  const breedRepositorySpy = new BreedRepositorySpy()
  const sut = new BreedService(breedRepositorySpy)

  return {
    sut,
    breedRepositorySpy
  }
}

describe('Breed Service loadList', () => {
  it('should call load if name is not passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'load')
    const params = {}

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should not call loadByName if name is not passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'loadByName')
    const params = {}

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not call load if name is passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'load')
    const params = { name: 'name' }

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should call loadByName if name is passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'loadByName')
    const params = { name: 'name' }

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should return a list of breeds', async () => {
    const { sut, breedRepositorySpy } = makeSut()

    let params = {}
    let breeds = await sut.loadList(params)
    expect(breeds).toBe(breedRepositorySpy.loadResult)

    params = { name: 'name' }
    breeds = await sut.loadList(params)
    expect(breeds).toBe(breedRepositorySpy.loadByNameResult)
  })
})
