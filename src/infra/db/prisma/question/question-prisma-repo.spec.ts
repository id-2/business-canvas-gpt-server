import type { PrismaClient } from '@prisma/client'
import type { QuestionModel } from '@/domain/models/db-models'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../helpers/prisma-helper'
import { QuestionPrismaRepo } from './question-prisma-repo'

const makeFakeQuestionsModel = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

let prismock: PrismaClient

describe('QuestionPrisma Repo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getCli').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.question.deleteMany()
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('Should create many Questions on success', async () => {
    const sut = new QuestionPrismaRepo()
    await sut.addMany(makeFakeQuestionsModel())
    const user = await prismock.question.findMany()
    expect(user).toEqual(makeFakeQuestionsModel())
  })
})
