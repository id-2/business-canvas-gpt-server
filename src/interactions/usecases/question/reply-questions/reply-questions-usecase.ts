import type { ReplyQuestions } from '@/domain/contracts'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'

export class ReplyQuestionsUseCase implements ReplyQuestions {
  constructor (private readonly fetchAllQuestionsRepo: FetchAllQuestionsRepo) {}

  async perform (): Promise<void> {
    await this.fetchAllQuestionsRepo.fetchAll()
  }
}
