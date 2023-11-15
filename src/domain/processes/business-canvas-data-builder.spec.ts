import type { UserAnswer } from '../entities/answer/answer-dto'
import type { QuestionModel } from '../models/db-models'
import { BusinessCanvasDataBuilder as sut } from './business-canvas-data-builder'

const makeFakeQuestionsModel = (): QuestionModel[] => ([{
  id: 'any_question_id',
  content: 'Qual o tipo do seu negócio?',
  alternatives: [{
    id: 'any_alternative_id',
    description: 'Presencial',
    questionId: 'any_question_id'
  }, {
    id: 'other_alternative_id',
    description: 'Online',
    questionId: 'any_question_id'
  }]
}, {
  id: 'other_question_id', content: 'Qual a localização ou público para o qual deseja trabalhar (Cidade, estado ou país)?'
}, {
  id: 'another_question_id', content: 'Descreva seu negócio:'
}])

const makeFakeUserAnswers = (): UserAnswer[] => ([
  { questionId: 'any_question_id', alternativeId: 'any_alternative_id' },
  { questionId: 'other_question_id', answer: 'any_answer' },
  { questionId: 'another_question_id', answer: 'other_answer' }
])

describe('BusinessCanvasDataBuilder', () => {
  it('Should return an BusinessCanvasDataBuilderRes formated', async () => {
    const result = sut.execute({
      userAnswers: makeFakeUserAnswers(), questions: makeFakeQuestionsModel()
    })
    expect(result).toEqual({
      typeOfBusiness: 'Presencial',
      businessDescription: 'other_answer',
      locationOrTargetAudience: 'any_answer'
    })
  })
})
