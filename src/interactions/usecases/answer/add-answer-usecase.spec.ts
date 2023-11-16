import type { IdModel } from '@/domain/models/output-models'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { AddAnswerDto } from '@/domain/contracts'
import type { AddAnswerRepo, AddAnswerRepoDto } from '@/interactions/contracts/db'
import { AddAnswerUseCase } from './add-answer-usecase'
import MockeDate from 'mockdate'

const makeFakeAddAnswerDto = (): AddAnswerDto => ({
  userId: 'any_user_id',
  answers: [
    { questionId: 'any_question_id', alternativeId: 'any_alternative_id' },
    { questionId: 'other_question_id', answer: 'any_answer' },
    { questionId: 'another_question_id', answer: 'other_answer' }
  ]
})

const date = new Date()

const makeFakeAddAnswerRepoDto = (): AddAnswerRepoDto => ({
  userId: 'any_user_id',
  answers: [{
    id: 'any_id_1',
    createdAt: date,
    questionId: 'any_question_id',
    alternativeId: 'any_alternative_id'
  }, {
    id: 'any_id_2',
    createdAt: date,
    questionId: 'other_question_id',
    description: 'any_answer'
  }, {
    id: 'any_id_3',
    createdAt: date,
    questionId: 'another_question_id',
    description: 'other_answer'
  }]
})

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    private callsCount = 0
    build (): IdModel {
      this.callsCount++
      return { id: `any_id_${this.callsCount}` }
    }
  }
  return new IdBuilderStub()
}

const makeAddAnswerRepo = (): AddAnswerRepo => {
  class AddAnswerRepoStub implements AddAnswerRepo {
    async add (data: AddAnswerRepoDto): Promise<void> {
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
  beforeAll(() => {
    MockeDate.set(date)
  })

  afterAll(() => {
    MockeDate.reset()
  })

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
    expect(addSpy).toHaveBeenCalledWith(makeFakeAddAnswerRepoDto())
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
