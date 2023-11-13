import type { QuestionModel } from '@/domain/models/db-models'

export interface AddManyQuestionsRepo {
  add: (data: QuestionModel[]) => Promise<void>
}
