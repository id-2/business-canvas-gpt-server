import type { QuestionModel } from '@/domain/models/db-models'
import type { AddManyQuestionsRepo } from '@/interactions/contracts/db'
import type { Prisma } from '@prisma/client'
import { PrismaHelper as prisma } from '../helpers/prisma-helper'

export class QuestionPrismaRepo implements AddManyQuestionsRepo {
  async addMany (data: QuestionModel[]): Promise<void> {
    const questions: QuestionModel[] = data.map((question) => ({
      id: question.id, content: question.content
    }))
    await (await prisma.getCli()).question.createMany({ data: questions })
    for (const question of data) {
      if (question.alternatives && question.alternatives.length > 0) {
        const alternatives: Prisma.AlternativeCreateManyInput[] = question.alternatives.map((alternative) => ({
          id: alternative.id,
          description: alternative.description,
          questionId: alternative.questionId
        }))
        await (await prisma.getCli()).alternative.createMany({ data: alternatives })
      }
    }
  }
}
