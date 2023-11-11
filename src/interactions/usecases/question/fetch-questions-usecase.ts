import type { FetchQuestions, FetchQuestionsRes } from '@/domain/contracts'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { right } from '@/shared/either'

export class FetchQuestionsUseCase implements FetchQuestions {
  constructor (private readonly fetchAllQuestionsRepo: FetchAllQuestionsRepo) {}

  async perform (): Promise<FetchQuestionsRes> {
    await this.fetchAllQuestionsRepo.fetchAll()
    return right([])
  }
}
