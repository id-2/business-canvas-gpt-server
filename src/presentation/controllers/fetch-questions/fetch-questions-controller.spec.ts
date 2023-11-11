import type { FetchQuestions, FetchQuestionsRes } from '@/domain/contracts'
import type { QuestionModel } from '@/domain/models/db-models'
import { notFound, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { FetchQuestionsController } from './fetch-questions-controller'
import { QuestionsNotFoundError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { ServerError } from '@/presentation/errors'

const makeFakeQuestions = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

const makeFetchQuestions = (): FetchQuestions => {
  class FetchQuestionsStub implements FetchQuestions {
    async perform (): Promise<FetchQuestionsRes> {
      return await Promise.resolve(right(makeFakeQuestions()))
    }
  }
  return new FetchQuestionsStub()
}

interface SutTypes {
  sut: FetchQuestionsController
  fetchQuestionsStub: FetchQuestions
}

const makeSut = (): SutTypes => {
  const fetchQuestionsStub = makeFetchQuestions()
  const sut = new FetchQuestionsController(fetchQuestionsStub)
  return { sut, fetchQuestionsStub }
}

describe('FetchQuestions UseCase', () => {
  it('Should call FetchQuestions', async () => {
    const { sut, fetchQuestionsStub } = makeSut()
    const performSpy = jest.spyOn(fetchQuestionsStub, 'perform')
    await sut.handle({})
    expect(performSpy).toHaveBeenCalled()
  })

  it('Should return 404 if FetchQuestions returns QuestionsNotFoundError', async () => {
    const { sut, fetchQuestionsStub } = makeSut()
    jest.spyOn(fetchQuestionsStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new QuestionsNotFoundError()))
    )
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(notFound(new QuestionsNotFoundError()))
  })

  it('Should return 500 if FetchQuestions throws', async () => {
    const { sut, fetchQuestionsStub } = makeSut()
    jest.spyOn(fetchQuestionsStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle({})
    const error = new Error()
    error.stack = 'any_stack'
    expect(httpResponse).toEqual(serverError(new ServerError(error.stack)))
  })

  it('Should return 200 if FetchQuestions is a success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeQuestions()))
  })
})
