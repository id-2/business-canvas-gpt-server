import type { Either } from '@/shared/either'
import type { CreateBusinessCanvasDto } from '../business-canvas/create-business-canvas'
import type { InvalidAlternativeIdError, InvalidAnswerError, InvalidQuestionIdError } from '@/domain/errors'

export interface AddAnswerDto extends CreateBusinessCanvasDto {}

export type AddAnswerRes = Either<InvalidQuestionIdError | InvalidAlternativeIdError | InvalidAnswerError, null>

export interface AddAnswer {
  perform: (dto: AddAnswerDto) => Promise<AddAnswerRes>
}
