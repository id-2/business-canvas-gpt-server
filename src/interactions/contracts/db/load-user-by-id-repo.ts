import type { UserModel } from '@/domain/models/db-models'

export interface LoadUserByIdRepo {
  loadById: (id: string) => Promise<null | UserModel>
}
