import type { QuestionModel } from '@/domain/models/db-models'
import type { AddManyQuestionsRepo } from '@/interactions/contracts/db'
import { PrismaHelper as prisma } from '../helpers/prisma-helper'

export class QuestionPrismaRepo implements AddManyQuestionsRepo {
  async addMany (data: QuestionModel[]): Promise<void> {
    const prismaCli = await prisma.getCli()
    const questions = data.map(({ id, content }) => ({ id, content }))
    await prismaCli.question.createMany({ data: questions })
    for (const { alternatives } of data) {
      if (alternatives && alternatives.length > 0) {
        await prismaCli.alternative.createMany({ data: alternatives })
      }
    }
  }
}
