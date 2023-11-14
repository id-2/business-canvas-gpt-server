import type { Either } from '@/shared/either'
import type { BusinessCanvasOutputModel } from '@/domain/models/output-models'
import type { InvalidAlternativeIdError, InvalidAnswerError, InvalidQuestionIdError } from '@/domain/errors'

export interface BusinessCanvasAnswer {
  questionId: string
  alternativeId?: string
  answer?: string
}

export interface CreateBusinessCanvasDto {
  userId: string
  answers: BusinessCanvasAnswer[]
}

export type CreateBusinessCanvasRes = Either<
InvalidQuestionIdError | InvalidAnswerError | InvalidAlternativeIdError, BusinessCanvasOutputModel
>

export interface CreateBusinessCanvas {
  perform: (dto: CreateBusinessCanvasDto) => Promise<CreateBusinessCanvasRes>
}
