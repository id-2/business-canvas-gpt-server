import type { QuestionModel } from '@/domain/models/db-models'
import type { AddManyQuestionsRepo, FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { ReplyQuestionsUseCase } from './reply-questions-usecase'
import { QuestionsNotFoundError } from '@/domain/errors'

const makeFakeQuestions = (): QuestionModel[] => ([
  {
    id: 'any_question_id',
    content: 'any_content',
    alternatives: [{
      id: 'any_alternative_id',
      description: 'any_alternative',
      questionId: 'any_question_id'
    }, {
      id: 'other_alternative_id',
      description: 'other_alternative',
      questionId: 'any_question_id'
    }]
  },
  { id: 'other_question_id', content: 'other_content' }
])

const makeFetchAllQuestionsRepo = (): FetchAllQuestionsRepo => {
  class FetchAllQuestionsRepoStub implements FetchAllQuestionsRepo {
    async fetchAll (): Promise<null | QuestionModel[]> {
      return await Promise.resolve(makeFakeQuestions())
    }
  }
  return new FetchAllQuestionsRepoStub()
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
  sut: ReplyQuestionsUseCase
  fetchAllQuestionsRepoStub: FetchAllQuestionsRepo
  addManyQuestionsRepoStub: AddManyQuestionsRepo
}

const makeSut = (): SutTypes => {
  const fetchAllQuestionsRepoStub = makeFetchAllQuestionsRepo()
  const addManyQuestionsRepoStub = makeAddManyQuestionsRepo()
  const sut = new ReplyQuestionsUseCase(fetchAllQuestionsRepoStub, addManyQuestionsRepoStub)
  return { sut, fetchAllQuestionsRepoStub, addManyQuestionsRepoStub }
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

  it('Should call AddManyQuestionsRepo with correct values', async () => {
    const { sut, addManyQuestionsRepoStub } = makeSut()
    const addSpy = jest.spyOn(addManyQuestionsRepoStub, 'addMany')
    await sut.perform()
    expect(addSpy).toHaveBeenCalledWith(makeFakeQuestions())
  })
})
