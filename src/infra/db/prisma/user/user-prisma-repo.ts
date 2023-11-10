import type { UserModel } from '@/domain/models/db-models'
import type { AddUserRepo } from '@/interactions/contracts/db'
import { PrismaHelper as prisma } from '../helpers/prisma-helper'

export class UserPrismaRepo implements AddUserRepo {
  async add (data: UserModel): Promise<void> {
    await (await prisma.getCli()).user.create({ data })
  }
}
