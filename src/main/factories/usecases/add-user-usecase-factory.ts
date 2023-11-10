import type { AddUser } from '@/domain/contracts'
import { AddUserUseCase } from '@/interactions/usecases/user/add-user-usecase'
import { bcryptAdapterFactory } from '../infra/cryptography/bcrypt-adapter-factory'
import { userPrismaRepoFactory } from '../infra/db/prisma/user-prisma-repo-factory'
import { uuidAdapterFactory } from '../infra/id/uuid-adapter-factory'
import { accessTokenBuilderUseCaseFactory } from './access-token-builder-usecase-factory'

export const addUserUseCaseFactory = (): AddUser => {
  return new AddUserUseCase(
    userPrismaRepoFactory(),
    bcryptAdapterFactory(),
    uuidAdapterFactory(),
    userPrismaRepoFactory(),
    accessTokenBuilderUseCaseFactory()
  )
}
