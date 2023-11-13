import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { IdModel } from '@/domain/models/output-models'
import type { AddManyQuestionsRepo } from '@/interactions/contracts/db'
import type { QuestionModel } from '@/domain/models/db-models'
import { type Alternative } from '@/domain/entities/alternative/alternative'
import { AddManyQuestionsUseCase } from './add-many-questions-usecase'
import { Question } from '@/domain/entities/question/question'

jest.mock('@/domain/entities/alternative/alternative', () => ({
  Alternative: {
    create: jest.fn((description: string) => ({ description }))
  }
}))

jest.mock('@/domain/entities/question/question', () => ({
  Question: {
    createMany: jest.fn(() => ([
      { question: { content: 'any_content' } },
      { question: { content: 'other_content' } }
    ])),
    getQuestion: jest.fn((
      values: { question: { content: string, alternatives?: Alternative[] } }
    ) => (
      { content: values.question.content, alternatives: values.question.alternatives }
    ))
  }
}))

const makeFakeQuestionsModel = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderSpy implements IdBuilder {
    private callsCount = 0
    build (): IdModel {
      if (this.callsCount === 0) {
        this.callsCount++
        return { id: 'any_id' }
      }
      return { id: 'other_id' }
    }
  }
  return new IdBuilderSpy()
}

const makeAddManyQuestionsRepo = (): AddManyQuestionsRepo => {
  class AddManyQuestionsRepoStub implements AddManyQuestionsRepo {
    async addMany (data: QuestionModel[]): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddManyQuestionsRepoStub()
}

interface SutTypes {
  sut: AddManyQuestionsUseCase
  idBuilderSpy: IdBuilder
  addManyQuestionsRepoStub: AddManyQuestionsRepo
}

const makeSut = (): SutTypes => {
  const idBuilderSpy = makeIdBuilder()
  const addManyQuestionsRepoStub = makeAddManyQuestionsRepo()
  const sut = new AddManyQuestionsUseCase(idBuilderSpy, addManyQuestionsRepoStub)
  return { sut, idBuilderSpy, addManyQuestionsRepoStub }
}

describe('AddManyQuestions UseCase', () => {
  it('Should call Question Entity ', async () => {
    const { sut } = makeSut()
    const createManySpy = jest.spyOn(Question, 'createMany')
    await sut.perform()
    expect(createManySpy).toHaveBeenCalled()
  })

  it('Should throw if Question Entity throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(Question, 'createMany').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should call IdBuilder', async () => {
    const { sut, idBuilderSpy } = makeSut()
    const buildSpy = jest.spyOn(idBuilderSpy, 'build')
    await sut.perform()
    expect(buildSpy).toHaveBeenCalledTimes(2)
  })

  it('Should throw if IdBuilder throws', async () => {
    const { sut, idBuilderSpy } = makeSut()
    jest.spyOn(idBuilderSpy, 'build').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddManyQuestionsRepo with correct values', async () => {
    const { sut, addManyQuestionsRepoStub } = makeSut()
    const addSpy = jest.spyOn(addManyQuestionsRepoStub, 'addMany')
    await sut.perform()
    expect(addSpy).toHaveBeenCalledWith(makeFakeQuestionsModel())
  })

  it('Should throw if AddUserRepo throws', async () => {
    const { sut, addManyQuestionsRepoStub } = makeSut()
    jest.spyOn(addManyQuestionsRepoStub, 'addMany').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })
})
