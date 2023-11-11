import type { QuestionModel } from '@/domain/models/db-models'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { RedisHelper } from './helpers/redis-helper'

export class QuestionRedisCache implements FetchAllQuestionsRepo {
  async fetchAll (): Promise<QuestionModel[]> {
    const redis = RedisHelper.getInstance()
    const questionsJson = await redis.get('questions')
    if (!questionsJson) {
      return []
    }
    const questions: QuestionModel[] = JSON.parse(questionsJson)
    return questions
  }
}
