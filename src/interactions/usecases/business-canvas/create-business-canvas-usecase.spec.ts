import type { AddAnswer, AddAnswerDto, AddAnswerRes, CreateBusinessCanvas, CreateBusinessCanvasDto } from '@/domain/contracts'
import type { QuestionModel } from '@/domain/models/db-models'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { CreateBusinessCanvasUseCase } from './create-business-canvas-usecase'
import { left, right } from '@/shared/either'
import { QuestionsNotFoundError } from '@/domain/errors'
import type { CreateManyAnswersDto } from '@/domain/entities/answer/answer-dto'
import { Answer } from '@/domain/entities/answer/answer'

jest.mock('@/domain/entities/answer/answer', () => ({
  Answer: {
    createMany: jest.fn((dto: CreateManyAnswersDto) => (
      makeFakeCreateBusinessCanvasDto().answers
    ))
  }
}))

const makeFakeCreateBusinessCanvasDto = (): CreateBusinessCanvasDto => ({
  userId: 'any_user_id',
  answers: [
    { questionId: 'any_question_id', alternativeId: 'any_alternative_id' },
    { questionId: 'other_question_id', answer: 'any_answer' }
  ]
})

const makeFakeQuestions = (): QuestionModel[] => ([{
  id: 'any_question_id',
  content: 'any_content',
  alternatives: [{
    id: 'any_alternative_id',
    description: 'any_description',
    questionId: 'any_question_id'
  }, {
    id: 'other_alternative_id',
    description: 'other_description',
    questionId: 'any_question_id'
  }]
},
{ id: 'other_question_id', content: 'other_content' }
])

const makeFetchAllQuestionsRepo = (): FetchAllQuestionsRepo => {
  class FetchAllQuestionsRepoStub implements FetchAllQuestionsRepo {
    async fetchAll (): Promise<QuestionModel[]> {
      return await Promise.resolve(makeFakeQuestions())
    }
  }
  return new FetchAllQuestionsRepoStub()
}

const makeAddAnswer = (): AddAnswer => {
  class AddAnswerStub implements AddAnswer {
    async perform (dto: AddAnswerDto): Promise<AddAnswerRes> {
      return await Promise.resolve(right(null))
    }
  }
  return new AddAnswerStub()
}

interface SutTypes {
  sut: CreateBusinessCanvas
  fetchAllQuestionsRepoStub: FetchAllQuestionsRepo
  addAnswerStub: AddAnswer
}

const makeSut = (): SutTypes => {
  const fetchAllQuestionsRepoStub = makeFetchAllQuestionsRepo()
  const addAnswerStub = makeAddAnswer()
  const sut = new CreateBusinessCanvasUseCase(
    fetchAllQuestionsRepoStub, addAnswerStub
  )
  return {
    sut, fetchAllQuestionsRepoStub, addAnswerStub
  }
}

describe('CreateBusinessCanvas UseCase', () => {
  it('Should call FetchAllQuestionsRepo', async () => {
    const { sut, fetchAllQuestionsRepoStub } = makeSut()
    const fetchAllSpy = jest.spyOn(fetchAllQuestionsRepoStub, 'fetchAll')
    await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(fetchAllSpy).toHaveBeenCalled()
  })

  it('Should throw if FetchAllQuestionsRepo returns empty list', async () => {
    const { sut, fetchAllQuestionsRepoStub } = makeSut()
    jest.spyOn(fetchAllQuestionsRepoStub, 'fetchAll').mockReturnValueOnce(
      Promise.resolve([])
    )
    const promise = sut.perform(makeFakeCreateBusinessCanvasDto())
    await expect(promise).rejects.toThrow(QuestionsNotFoundError)
  })

  it('Should throw if QuestionsNotFoundError throws', async () => {
    const { sut, fetchAllQuestionsRepoStub } = makeSut()
    jest.spyOn(fetchAllQuestionsRepoStub, 'fetchAll').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeCreateBusinessCanvasDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should call Answer Entity with correct values', async () => {
    const { sut } = makeSut()
    const createManySpy = jest.spyOn(Answer, 'createMany')
    await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(createManySpy).toHaveBeenCalledWith({
      userAnswers: makeFakeCreateBusinessCanvasDto().answers,
      questions: makeFakeQuestions()
    })
  })

  it('Should call AddAnswer with correct values', async () => {
    const { sut, addAnswerStub } = makeSut()
    const performSpy = jest.spyOn(addAnswerStub, 'perform')
    await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(performSpy).toHaveBeenCalledWith(makeFakeCreateBusinessCanvasDto())
  })

  it('Should return the same error as AddAnswer if it returns an error', async () => {
    const { sut, addAnswerStub } = makeSut()
    jest.spyOn(addAnswerStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const result = await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(result.value).toEqual(new Error('any_message'))
  })

  it('Should throw if AddAnswer throws', async () => {
    const { sut, addAnswerStub } = makeSut()
    jest.spyOn(addAnswerStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeCreateBusinessCanvasDto())
    await expect(promise).rejects.toThrow()
  })
})
