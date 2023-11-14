import type { QuestionModel } from '@/domain/models/db-models'
import { Answer as sut } from './answer'
import { AlternativeIsNotAllowedError, AnswerAndAlternativeNotProvidedError, AnswerIsNotAllowedError, InvalidAlternativeIdError, InvalidQuestionIdError } from './errors'
import { MixedAnswerError } from './errors/mixed-answer-error'

const makeFakeQuestionsModel = (): QuestionModel[] => ([{
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
}, {
  id: 'other_question_id', content: 'other_content'
}])

describe('Answer Entity', () => {
  it('Should return AnswerAndAlternativeNotProvidedError if answer and a alternativeId not provided', () => {
    const result = sut.create({
      userAnswer: { questionId: 'any_question_id' },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new AnswerAndAlternativeNotProvidedError())
  })

  it('Should return MixedAnswerError if answer and a alternativeId is provided', () => {
    const result = sut.create({
      userAnswer: {
        questionId: 'any_question_id',
        alternativeId: 'invalid_alternative_id',
        answer: 'invalid_answer'
      },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new MixedAnswerError())
  })

  it('Should return InvalidQuestionIdError if user answer questionId is invalid', () => {
    const result = sut.create({
      userAnswer: { questionId: 'invalid_question_id', answer: 'any_answer' },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new InvalidQuestionIdError('invalid_question_id'))
  })

  it('Should return AnswerIsNotAllowedError if the answer field is sent for a question that does not require it', () => {
    const result = sut.create({
      userAnswer: { questionId: 'any_question_id', answer: 'any_answer' },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new AnswerIsNotAllowedError())
  })

  it('Should return AlternativeIsNotAllowedError if the alternativeId field is sent for a question that does not require it', () => {
    const result = sut.create({
      userAnswer: { questionId: 'other_question_id', alternativeId: 'any_alternative_id' },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new AlternativeIsNotAllowedError())
  })

  it('Should return InvalidAlternativeIdError if user answer alternativeId is invalid', () => {
    const result = sut.create({
      userAnswer: { questionId: 'any_question_id', alternativeId: 'invalid_alternative_id' },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new InvalidAlternativeIdError('invalid_alternative_id'))
  })
})
