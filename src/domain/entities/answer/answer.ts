import type { QuestionModel } from '@/domain/models/db-models'
import { right, type Either, left } from '@/shared/either'
import { AnswerAndAlternativeNotProvidedError, InvalidQuestionIdError, type InvalidAnswerError, AnswerIsNotAllowedError } from './errors'

export interface AnswerEntityModel {
  questionId: string
  alternativeId?: string
  answer?: string
}

export interface UserAnswer {
  questionId: string
  alternativeId?: string
  answer?: string
}

export interface AnswerDto {
  userAnswer: UserAnswer
  questions: QuestionModel[]
}

export type AnswerErrors =
InvalidQuestionIdError |
AnswerAndAlternativeNotProvidedError |
InvalidAnswerError |
AnswerIsNotAllowedError

export type AnswerRes = Either<AnswerErrors, Answer>
type ValidateRes = Either<AnswerErrors, null>

export class Answer {
  private constructor (private readonly answer: AnswerEntityModel) {}

  static create (dto: AnswerDto): AnswerRes {
    const validateResult = this.validate(dto)
    if (validateResult.isLeft()) {
      return left(validateResult.value)
    }
    return right(
      new Answer({ questionId: '', answer: '' })
    )
  }

  private static validate (dto: AnswerDto): ValidateRes {
    const { userAnswer, questions } = dto
    if (!userAnswer.alternativeId && !userAnswer.answer) {
      return left(new AnswerAndAlternativeNotProvidedError())
    }
    if (!questions.some(question => question.id === userAnswer.questionId)) {
      return left(new InvalidQuestionIdError(userAnswer.questionId))
    }
    const question = questions.find(question => question.id === userAnswer.questionId)
    if (question?.alternatives && userAnswer.answer) {
      return left(new AnswerIsNotAllowedError())
    }
    return right(null)
  }
}
