import type { AccessTokenBuilder } from '@/domain/contracts'
import { AccessTokenBuilderUseCase } from '@/interactions/usecases/access/access-token-builder-usecase'
import { jwtAdapterFactory } from '../infra/cryptography/jwt-adapter-factory'

export const accessTokenBuilderUseCaseFactory = (): AccessTokenBuilder => {
  return new AccessTokenBuilderUseCase(jwtAdapterFactory())
}
