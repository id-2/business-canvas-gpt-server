import type { AddAnswer, AddAnswerDto, AddAnswerRes, CreateBusinessCanvas, CreateBusinessCanvasDto } from '@/domain/contracts'
import { CreateBusinessCanvasUseCase } from './create-business-canvas-usecase'
import { right } from '@/shared/either'

const makeFakeCreateBusinessCanvasDto = (): CreateBusinessCanvasDto => ({
  userId: 'any_user_id',
  answers: [
    { questionId: 'any_question_id', alternativeId: 'any_alternative_id' },
    { questionId: 'other_question_id', answer: 'any_answer' }
  ]
})

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
  addAnswerStub: AddAnswer
}

const makeSut = (): SutTypes => {
  const addAnswerStub = makeAddAnswer()
  const sut = new CreateBusinessCanvasUseCase(addAnswerStub)
  return { sut, addAnswerStub }
}

describe('CreateBusinessCanvas UseCase', () => {
  it('Should call AddAnswer with correct values', async () => {
    const { sut, addAnswerStub } = makeSut()
    const performSpy = jest.spyOn(addAnswerStub, 'perform')
    await sut.perform(makeFakeCreateBusinessCanvasDto())
    expect(performSpy).toHaveBeenCalledWith(makeFakeCreateBusinessCanvasDto())
  })
})
