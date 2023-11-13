import type { AddManyQuestions } from '@/domain/contracts'
import { AddManyQuestionsUseCase } from '@/interactions/usecases/question'
import { questionPrismaRepoFactory } from '../infra/db/prisma/question-prisma-repo-factory'
import { uuidAdapterFactory } from '../infra/id/uuid-adapter-factory'

export const addManyQuestionsUseCaseFactory = (): AddManyQuestions => {
  return new AddManyQuestionsUseCase(
    uuidAdapterFactory(), questionPrismaRepoFactory()
  )
}
