import type { AddManyQuestionsRepo } from '@/interactions/contracts/db'
import type { QuestionModel } from '@/domain/models/db-models'
import { PrismaHelper as prisma } from '../helpers/prisma-helper'

export class QuestionPrismaRepo implements AddManyQuestionsRepo {
  async add (data: QuestionModel[]): Promise<void> {
    await (await prisma.getCli()).question.createMany({ data })
  }
}
