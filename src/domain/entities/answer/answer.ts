import type { QuestionModel } from '@/domain/models/db-models'
import { right, type Either, left } from '@/shared/either'
import { AnswerAndAlternativeNotProvidedError, InvalidQuestionIdError, InvalidAnswerError, AnswerIsNotAllowedError, MixedAnswerError, AlternativeIsNotAllowedError, InvalidAlternativeIdError } from './errors'

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
AnswerIsNotAllowedError |
MixedAnswerError |
AlternativeIsNotAllowedError |
InvalidAlternativeIdError

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
    if (userAnswer.answer && userAnswer.alternativeId) {
      return left(new MixedAnswerError())
    }
    const question = questions.find(question => question.id === userAnswer.questionId)
    if (!question) {
      return left(new InvalidQuestionIdError(userAnswer.questionId))
    }
    if (question?.alternatives && userAnswer.answer) {
      return left(new AnswerIsNotAllowedError())
    }
    if (!question?.alternatives && userAnswer.alternativeId) {
      return left(new AlternativeIsNotAllowedError())
    }
    if (question.alternatives && userAnswer.alternativeId) {
      const alternative = question.alternatives.find(
        alternative => alternative.id === userAnswer.alternativeId
      )
      if (!alternative) {
        return left(new InvalidAlternativeIdError(userAnswer.alternativeId))
      }
    }
    if (!question.alternatives && userAnswer.answer) {
      if (userAnswer.answer.length < 3 || userAnswer.answer.length > 750) {
        return left(new InvalidAnswerError(userAnswer.answer))
      }
    }
    return right(null)
  }
}
