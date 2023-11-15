import type { IdModel } from '@/domain/models/output-models'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { AddAnswerDto } from '@/domain/contracts'
import { AddAnswerUseCase } from './add-answer-usecase'

const makeFakeAddAnswerDto = (): AddAnswerDto => ({
  userId: 'any_user_id',
  answers: [
    { questionId: 'type_question_id', alternativeId: 'in_person_alternative_id' },
    { questionId: 'location_question_id', answer: 'location_answer' },
    { questionId: 'description_question_id', answer: 'description_answer' }
  ]
})

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): IdModel {
      return { id: 'any_id' }
    }
  }
  return new IdBuilderStub()
}

interface SutTypes {
  sut: AddAnswerUseCase
  idBuilderStub: IdBuilder
}

const makeSut = (): SutTypes => {
  const idBuilderStub = makeIdBuilder()
  const sut = new AddAnswerUseCase(idBuilderStub)
  return { sut, idBuilderStub }
}

describe('AddAnswer UseCase', () => {
  it('Should call IdBuilder', async () => {
    const { sut, idBuilderStub } = makeSut()
    const buildSpy = jest.spyOn(idBuilderStub, 'build')
    await sut.perform(makeFakeAddAnswerDto())
    expect(buildSpy).toHaveBeenCalled()
  })

  it('Should throw if IdBuilder throws', async () => {
    const { sut, idBuilderStub } = makeSut()
    jest.spyOn(idBuilderStub, 'build').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform(makeFakeAddAnswerDto())
    await expect(promise).rejects.toThrow()
  })
})
