import type { ReplyQuestions } from '@/domain/contracts'
import { QuestionsNotFoundError } from '@/domain/errors'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'

export class ReplyQuestionsUseCase implements ReplyQuestions {
  constructor (private readonly fetchAllQuestionsRepo: FetchAllQuestionsRepo) {}

  async perform (): Promise<void> {
    const questions = await this.fetchAllQuestionsRepo.fetchAll()
    if (!questions) {
      throw new QuestionsNotFoundError()
    }
  }
}
