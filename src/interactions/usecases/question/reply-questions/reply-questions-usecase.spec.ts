import type { QuestionModel } from '@/domain/models/db-models'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { ReplyQuestionsUseCase } from './reply-questions-usecase'
import { QuestionsNotFoundError } from '@/domain/errors'

const makeFakeQuestions = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

const makeFetchAllQuestionsRepo = (): FetchAllQuestionsRepo => {
  class FetchAllQuestionsRepoStub implements FetchAllQuestionsRepo {
    async fetchAll (): Promise<null | QuestionModel[]> {
      return await Promise.resolve(makeFakeQuestions())
    }
  }
  return new FetchAllQuestionsRepoStub()
}

interface SutTypes {
  sut: ReplyQuestionsUseCase
  fetchAllQuestionsRepoStub: FetchAllQuestionsRepo
}

const makeSut = (): SutTypes => {
  const fetchAllQuestionsRepoStub = makeFetchAllQuestionsRepo()
  const sut = new ReplyQuestionsUseCase(fetchAllQuestionsRepoStub)
  return { sut, fetchAllQuestionsRepoStub }
}

describe('ReplyQuestions UseCase', () => {
  it('Should call FetchAllQuestionsRepo', async () => {
    const { sut, fetchAllQuestionsRepoStub } = makeSut()
    const fetchAllSpy = jest.spyOn(fetchAllQuestionsRepoStub, 'fetchAll')
    await sut.perform()
    expect(fetchAllSpy).toHaveBeenCalled()
  })

  it('Should throw QuestionsNotFoundError if FetchAllQuestionsRepo returns null', async () => {
    const { sut, fetchAllQuestionsRepoStub } = makeSut()
    jest.spyOn(fetchAllQuestionsRepoStub, 'fetchAll').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const promise = sut.perform()
    await expect(promise).rejects.toThrow(QuestionsNotFoundError)
  })

  it('Should throw QuestionsNotFoundError if FetchAllQuestionsRepo returns empty list', async () => {
    const { sut, fetchAllQuestionsRepoStub } = makeSut()
    jest.spyOn(fetchAllQuestionsRepoStub, 'fetchAll').mockReturnValueOnce(
      Promise.resolve([])
    )
    const promise = sut.perform()
    await expect(promise).rejects.toThrow(QuestionsNotFoundError)
  })
})
