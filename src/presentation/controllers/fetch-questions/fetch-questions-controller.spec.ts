import type { FetchQuestions, FetchQuestionsRes } from '@/domain/contracts'
import type { QuestionModel } from '@/domain/models/db-models'
import { FetchQuestionsController } from './fetch-questions-controller'
import { left, right } from '@/shared/either'
import { notFound } from '@/presentation/helpers/http/http-helpers'
import { QuestionsNotFoundError } from '@/domain/errors'

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
    const HttpResponse = await sut.handle({})
    expect(HttpResponse).toEqual(notFound(new QuestionsNotFoundError()))
  })
})
