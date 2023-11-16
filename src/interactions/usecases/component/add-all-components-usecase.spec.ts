import { Component } from '@/domain/entities/component'
import { AddAllComponentsUseCase } from './add-all-componetns-usecase'

jest.mock('@/domain/entities/question/question', () => ({
  Component: {
    createMany: jest.fn(() => (makeFakeComponentName()))
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

interface SutTypes {
  sut: AddAllComponentsUseCase
}

const makeSut = (): SutTypes => {
  const sut = new AddAllComponentsUseCase()
  return { sut }
}

describe('AddAllComponents UseCase', () => {
  it('Should call Component Entity ', async () => {
    const { sut } = makeSut()
    const createManySpy = jest.spyOn(Component, 'createMany')
    await sut.perform()
    expect(createManySpy).toHaveBeenCalled()
  })
})
