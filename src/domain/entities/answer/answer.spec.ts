import type { QuestionModel } from '@/domain/models/db-models'
import { type UserAnswer, Answer as sut } from './answer'
import { AnswerAndAlternativeNotProvidedError, InvalidAnswerError, InvalidQuestionIdError } from './errors'

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

const makeFakeUserAnswer = (): UserAnswer => ({
  questionId: 'any_question_id',
  alternativeId: 'any_alternative_id'
})

describe('Answer Entity', () => {
  it('Should return AnswerAndAlternativeNotProvidedError if answer and a alternativeId not provided', () => {
    const result = sut.create({
      userAnswer: { questionId: 'any_question_id' },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new AnswerAndAlternativeNotProvidedError())
  })

  it('Should return InvalidQuestionIdError if user answer questionId is invalid', () => {
    const result = sut.create({
      userAnswer: { questionId: 'invalid_question_id', answer: 'any_answer' },
      questions: makeFakeQuestionsModel()
    })
    expect(result.value).toEqual(new InvalidQuestionIdError('invalid_question_id'))
  })
})
