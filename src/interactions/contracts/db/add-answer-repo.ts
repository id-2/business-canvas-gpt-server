import type { BusinessCanvasAnswer } from '@/domain/contracts'

export interface AddAnswerRepoDto {
  id: string
  userId: string
  answers: BusinessCanvasAnswer[]
}

export interface AddAnswerRepo {
  add: (dto: AddAnswerRepoDto) => Promise<void>
}
