import type { Validation } from '@/presentation/contracts/validation'
import type { HttpRequest } from '@/presentation/http/http'
import { right, type Either, left } from '@/shared/either'
import { CreateBusinessCanvasController } from './create-business-canvas-controller'
import { badRequest } from '@/presentation/helpers/http/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  body: [{
    questionId: 'any_question_id',
    answer: 'any_answer'
  }, {
    questionId: 'other_question_id',
    answer: 'other_answer'
  }, {
    questionId: 'another_question_id',
    alternativeId: 'any_alternative_id'
  }]
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Either<Error, null> {
      return right(null)
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: CreateBusinessCanvasController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new CreateBusinessCanvasController(validationStub)
  return { sut, validationStub }
}

describe('CreateBusinessCanvas Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      left(new Error('any_message'))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })
})
