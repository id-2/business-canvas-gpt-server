import type { IdModel } from '@/domain/models/output-models'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { AddAnswerDto } from '@/domain/contracts'
import { AddAnswerUseCase } from './add-answer-usecase'
import { type AddAnswerRepo, type AddAnswerRepoDto } from '@/interactions/contracts/db'

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

const makeAddAnswerRepo = (): AddAnswerRepo => {
  class AddAnswerRepoStub implements AddAnswerRepo {
    async add (dto: AddAnswerRepoDto): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddAnswerRepoStub()
}

interface SutTypes {
  sut: AddAnswerUseCase
  idBuilderStub: IdBuilder
  addAnswerRepoStub: AddAnswerRepo
}

const makeSut = (): SutTypes => {
  const idBuilderStub = makeIdBuilder()
  const addAnswerRepoStub = makeAddAnswerRepo()
  const sut = new AddAnswerUseCase(idBuilderStub, addAnswerRepoStub)
  return { sut, idBuilderStub, addAnswerRepoStub }
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

  it('Should call AddAnswerRepo with correct values', async () => {
    const { sut, addAnswerRepoStub } = makeSut()
    const addSpy = jest.spyOn(addAnswerRepoStub, 'add')
    await sut.perform(makeFakeAddAnswerDto())
    expect(addSpy).toHaveBeenCalledWith({
      id: 'any_id',
      userId: 'any_user_id',
      answers: makeFakeAddAnswerDto().answers
    })
  })

  it('Should throw if AddAnswerRepo throws', async () => {
    const { sut, addAnswerRepoStub } = makeSut()
    jest.spyOn(addAnswerRepoStub, 'add').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeAddAnswerDto())
    await expect(promise).rejects.toThrow()
  })
})
