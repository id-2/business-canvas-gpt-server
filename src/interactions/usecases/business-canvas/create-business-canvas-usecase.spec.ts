import type { AddAnswer, AddAnswerDto, AddAnswerRes, AddRandomUser, CreateBusinessCanvas, CreateBusinessCanvasDto } from '@/domain/contracts'
import type { QuestionModel } from '@/domain/models/db-models'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import type { CreateManyAnswersDto } from '@/domain/entities/answer/answer-dto'
import type { IdModel } from '@/domain/models/output-models'
import { CreateBusinessCanvasUseCase } from './create-business-canvas-usecase'
import { left, right } from '@/shared/either'
import { QuestionsNotFoundError } from '@/domain/errors'
import { Answer } from '@/domain/entities/answer/answer'
import { BusinessCanvasDataBuilder, type BusinessCanvasDataBuilderRes, type BusinessCanvasDataBuilderDto } from '@/domain/processes/business-canvas-data-builder/business-canvas-data-builder'
import { GenerateInputToCreateBusinessCanvas } from '@/domain/processes/generate-input-to-create-business-canvas/generate-input-to-create-business-canvas'

jest.mock('@/domain/entities/answer/answer', () => ({
  Answer: {
    createMany: jest.fn((dto: CreateManyAnswersDto) => (
      right(makeFakeCreateBusinessCanvasDto().answers)
    ))
  }
}))

jest.mock('@/domain/processes/business-canvas-data-builder/business-canvas-data-builder', () => ({
  BusinessCanvasDataBuilder: {
    execute: jest.fn((dto: BusinessCanvasDataBuilderDto) => (
      makeFakeBusinessCanvasDataBuilderRes()
    ))
  }
}))

const makeFakeCreateBusinessCanvasDto = (): CreateBusinessCanvasDto => ({
  userId: 'any_user_id',
  answers: [
    { questionId: 'type_question_id', alternativeId: 'in_person_alternative_id' },
    { questionId: 'location_question_id', answer: 'location_answer' },
    { questionId: 'description_question_id', answer: 'description_answer' }
  ]
})

const makeFakeQuestionsModel = (): QuestionModel[] => ([{
  id: 'type_question_id',
  content: 'Qual o tipo do seu negócio?',
  alternatives: [{
    id: 'in_person_alternative_id',
    description: 'in_person',
    questionId: 'type_question_id'
  }, {
    id: 'online_alternative_id',
    description: 'online',
    questionId: 'type_question_id'
  }]
}, {
  id: 'location_question_id', content: 'Qual a localização ou público para o qual deseja trabalhar (Cidade, estado ou país)?'
}, {
  id: 'description_question_id', content: 'Descreva seu negócio:'
}])

const makeFakeBusinessCanvasDataBuilderRes = (): BusinessCanvasDataBuilderRes => ({
  businessDescription: 'description_answer',
  typeOfBusiness: 'in_person',
  locationOrTargetAudience: 'location_answer'
})

const makeFetchAllQuestionsRepo = (): FetchAllQuestionsRepo => {
  class FetchAllQuestionsRepoStub implements FetchAllQuestionsRepo {
    async fetchAll (): Promise<QuestionModel[]> {
      return await Promise.resolve(makeFakeQuestionsModel())
    }
  }
  return new FetchAllQuestionsRepoStub()
}

const makeAddRandomUser = (): AddRandomUser => {
  class AddRandomUserStub implements AddRandomUser {
    async perform (): Promise<IdModel> {
      return await Promise.resolve({ id: 'any_random_user_id' })
    }
  }
  return new AddRandomUserStub()
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
  addRandomUserStub: AddRandomUser
  addAnswerStub: AddAnswer
}

const makeSut = (): SutTypes => {
  const fetchAllQuestionsRepoStub = makeFetchAllQuestionsRepo()
  const addRandomUserStub = makeAddRandomUser()
  const addAnswerStub = makeAddAnswer()
  const sut = new CreateBusinessCanvasUseCase(
    fetchAllQuestionsRepoStub, addRandomUserStub, addAnswerStub
  )
  return {
    sut, fetchAllQuestionsRepoStub, addRandomUserStub, addAnswerStub
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
      questions: makeFakeQuestionsModel()
    })
  })

  it('Should return a Error if create many Answers fails', async () => {
    const { sut } = makeSut()
    jest.spyOn(Answer, 'createMany').mockReturnValueOnce(
      left(new Error('any_message'))
    )
    const result = await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(result.value).toEqual(new Error('any_message'))
  })

  it('Should throw if Answer Entity throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(Answer, 'createMany').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.perform(makeFakeCreateBusinessCanvasDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddRandomUser if userId not provided', async () => {
    const { sut, addRandomUserStub } = makeSut()
    const performSpy = jest.spyOn(addRandomUserStub, 'perform')
    await sut.perform({ answers: makeFakeCreateBusinessCanvasDto().answers })
    expect(performSpy).toHaveBeenCalled()
  })

  it('Should not call AddRandomUser if userId is provided', async () => {
    const { sut, addRandomUserStub } = makeSut()
    const performSpy = jest.spyOn(addRandomUserStub, 'perform')
    await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(performSpy).not.toHaveBeenCalled()
  })

  it('Should throw if AddRandomUser throws', async () => {
    const { sut, addRandomUserStub } = makeSut()
    jest.spyOn(addRandomUserStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform({ answers: makeFakeCreateBusinessCanvasDto().answers })
    await expect(promise).rejects.toThrow()
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

  it('Should call AddAnswer with random user id if userId not provided', async () => {
    const { sut, addAnswerStub } = makeSut()
    const performSpy = jest.spyOn(addAnswerStub, 'perform')
    await sut.perform({ answers: makeFakeCreateBusinessCanvasDto().answers })
    expect(performSpy).toHaveBeenCalledWith({
      userId: 'any_random_user_id',
      answers: makeFakeCreateBusinessCanvasDto().answers
    })
  })

  it('Should call BusinessCanvasDataBuilder with correct values', async () => {
    const { sut } = makeSut()
    const createManySpy = jest.spyOn(BusinessCanvasDataBuilder, 'execute')
    await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(createManySpy).toHaveBeenCalledWith({
      userAnswers: makeFakeCreateBusinessCanvasDto().answers,
      questions: makeFakeQuestionsModel()
    })
  })

  it('Should throw if BusinessCanvasDataBuilder throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(BusinessCanvasDataBuilder, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.perform(makeFakeCreateBusinessCanvasDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should call GenerateInputToCreateBusinessCanvas with correct values', async () => {
    const { sut } = makeSut()
    const executeSpy = jest.spyOn(GenerateInputToCreateBusinessCanvas, 'execute')
    await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(executeSpy).toHaveBeenCalledWith(makeFakeBusinessCanvasDataBuilderRes())
  })
})
