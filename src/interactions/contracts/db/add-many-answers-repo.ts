import type { AnswerModel } from '@/domain/models/db-models'

export interface AddAnswerRepoDto {
  userId: string
  answers: Array<Omit<AnswerModel, 'userId'>>
}

export interface AddAnswerRepo {
  add: (dto: AddAnswerRepoDto) => Promise<void>
}
