import type { QuestionModel } from '@/domain/models/db-models'
import { right, type Either, left } from '@/shared/either'
import { AnswerAndAlternativeNotProvidedError } from './errors'

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

export type AnswerRes = Either<AnswerAndAlternativeNotProvidedError, Answer>
type ValidateRes = Either<AnswerAndAlternativeNotProvidedError, null>

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
    const { userAnswer } = dto
    if (!userAnswer.alternativeId && !userAnswer.answer) {
      return left(new AnswerAndAlternativeNotProvidedError())
    }
    return right(null)
  }
}
