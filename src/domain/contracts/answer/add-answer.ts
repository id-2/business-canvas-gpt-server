import type { AnswerErrors } from '@/domain/entities/answer/answer-response'
import type { Either } from '@/shared/either'
import type { CreateBusinessCanvasDto } from '../business-canvas/create-business-canvas'

export interface AddAnswerDto extends CreateBusinessCanvasDto {}

export type AddAnswerRes = Either<AnswerErrors, null>

export interface AddAnswer {
  perform: (dto: AddAnswerDto) => Promise<AddAnswerRes>
}
