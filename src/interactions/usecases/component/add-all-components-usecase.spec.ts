import type { ComponentModel } from '@/domain/models/db-models'
import type { AddAllComponentsRepo } from '@/interactions/contracts/db'
import { Component, type ComponentName } from '@/domain/entities/component'
import { AddAllComponentsUseCase } from './add-all-componetns-usecase'

jest.mock('@/domain/entities/question/question', () => ({
  Component: {
    createMany: jest.fn(() => (makeFakeComponentName())),
    getComponent: jest.fn(
      (component: { name: ComponentName }) => (component.name)
    )
  }
}))

const makeFakeComponentName = (): any => ([
  { name: 'customerSegments' },
  { name: 'valuePropositions' },
  { name: 'channels' },
  { name: 'customerRelationships' },
  { name: 'revenueStreams' },
  { name: 'keyResources' },
  { name: 'keyActivities' },
  { name: 'keyPartnerships' },
  { name: 'costStructure' }
])

const makeFakeComponentModels = (): ComponentModel[] => ([
  { id: 'any_id_1', name: 'customerSegments' },
  { id: 'any_id_2', name: 'valuePropositions' },
  { id: 'any_id_3', name: 'channels' },
  { id: 'any_id_4', name: 'customerRelationships' },
  { id: 'any_id_5', name: 'revenueStreams' },
  { id: 'any_id_6', name: 'keyResources' },
  { id: 'any_id_7', name: 'keyActivities' },
  { id: 'any_id_8', name: 'keyPartnerships' },
  { id: 'any_id_9', name: 'costStructure' }
])

const makeAddAllComponentsRepo = (): AddAllComponentsRepo => {
  class AddAllComponentsRepoStub implements AddAllComponentsRepo {
    async addAll (data: ComponentModel[]): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddAllComponentsRepoStub()
}

interface SutTypes {
  sut: AddAllComponentsUseCase
  addAllComponentsRepoStub: AddAllComponentsRepo
}

const makeSut = (): SutTypes => {
  const addAllComponentsRepoStub = makeAddAllComponentsRepo()
  const sut = new AddAllComponentsUseCase(addAllComponentsRepoStub)
  return { sut, addAllComponentsRepoStub }
}

describe('AddAllComponents UseCase', () => {
  it('Should call Component Entity ', async () => {
    const { sut } = makeSut()
    const createManySpy = jest.spyOn(Component, 'createMany')
    await sut.perform()
    expect(createManySpy).toHaveBeenCalled()
  })

  it('Should call AddAllComponentsRepo with correct values', async () => {
    const { sut, addAllComponentsRepoStub } = makeSut()
    const addAllSpy = jest.spyOn(addAllComponentsRepoStub, 'addAll')
    await sut.perform()
    expect(addAllSpy).toHaveBeenCalledWith(makeFakeComponentModels())
  })
})
