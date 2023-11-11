import type { QuestionModel } from '@/domain/models/db-models'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { FetchQuestionsUseCase } from './fetch-questions-usecase'

const makeFakeQuestions = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

const makeFetchAllQuestionsRepo = (): FetchAllQuestionsRepo => {
  class FetchAllQuestionsRepoStub implements FetchAllQuestionsRepo {
    async fetchAll (): Promise<QuestionModel[]> {
      return await Promise.resolve(makeFakeQuestions())
    }
  }
  return new FetchAllQuestionsRepoStub()
}

interface SutTypes {
  sut: FetchQuestionsUseCase
  fetchAllQuestionsRepoStub: FetchAllQuestionsRepo
}

const makeSut = (): SutTypes => {
  const fetchAllQuestionsRepoStub = makeFetchAllQuestionsRepo()
  const sut = new FetchQuestionsUseCase(fetchAllQuestionsRepoStub)
  return { sut, fetchAllQuestionsRepoStub }
}

describe('FetchQuestions UseCase', () => {
  it('Should call FetchAllQuestionsRepo', async () => {
    const { sut, fetchAllQuestionsRepoStub } = makeSut()
    const fetchAllSpy = jest.spyOn(fetchAllQuestionsRepoStub, 'fetchAll')
    await sut.perform()
    expect(fetchAllSpy).toHaveBeenCalled()
  })
})
