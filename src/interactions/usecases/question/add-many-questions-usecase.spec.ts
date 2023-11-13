import { Question } from '@/domain/entities/question/question'
import { AddManyQuestionsUseCase } from './add-many-questions-usecase'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { IdModel } from '@/domain/models/output-models'

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): IdModel {
      return { id: 'any_id' }
    }
  }
  return new IdBuilderStub()
}

interface SutTypes {
  sut: AddManyQuestionsUseCase
  idBuilderStub: IdBuilder
}

const makeSut = (): SutTypes => {
  const idBuilderStub = makeIdBuilder()
  const sut = new AddManyQuestionsUseCase(idBuilderStub)
  return { sut, idBuilderStub }
}

describe('AddManyQuestions UseCase', () => {
  it('Should call IdBuilder', async () => {
    const { sut, idBuilderStub } = makeSut()
    const buildSpy = jest.spyOn(idBuilderStub, 'build')
    await sut.perform()
    expect(buildSpy).toHaveBeenCalled()
  })

  it('Should call Question Entity ', async () => {
    const { sut } = makeSut()
    const createManySpy = jest.spyOn(Question, 'createMany')
    await sut.perform()
    expect(createManySpy).toHaveBeenCalled()
  })
})
