import type { BusinessCanvasAnswer } from '../business-canvas/create-business-canvas'

export interface AddAnswerDto {
  userId: string
  answers: BusinessCanvasAnswer[]
}

export interface AddAnswer {
  perform: (dto: AddAnswerDto) => Promise<void>
}
