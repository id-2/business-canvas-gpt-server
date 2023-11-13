import type { ReplyQuestions } from '@/domain/contracts'
import { ReplyQuestionsUseCase } from '@/interactions/usecases/question'
import { questionRedisCacheFactory } from '../infra/cache/question-redis-cache-factory'
import { questionPrismaRepoFactory } from '../infra/db/prisma/question-prisma-repo-factory'

export const replyQuestionsUseCaseFactory = (): ReplyQuestions => {
  return new ReplyQuestionsUseCase(questionPrismaRepoFactory(), questionRedisCacheFactory())
}
