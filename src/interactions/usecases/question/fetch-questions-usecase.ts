import type { FetchQuestions, FetchQuestionsRes } from '@/domain/contracts'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { QuestionsNotFoundError } from '@/domain/errors'
import { left, right } from '@/shared/either'

export class FetchQuestionsUseCase implements FetchQuestions {
  constructor (private readonly fetchAllQuestionsRepo: FetchAllQuestionsRepo) {}

  async perform (): Promise<FetchQuestionsRes> {
    const questions = await this.fetchAllQuestionsRepo.fetchAll()
    if (questions.length === 0) {
      return left(new QuestionsNotFoundError())
    }
    return right([])
  }
}
