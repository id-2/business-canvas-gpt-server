import type { AlternativeModel, QuestionModel } from '@/domain/models/db-models'
import type { PrismaClient } from '@prisma/client'
import type { Redis } from 'ioredis'
import { RedisHelper } from '@/infra/cache/redis/helpers/redis-helper'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { PrismockClient } from 'prismock'
import RedisMock from 'ioredis-mock'
import replyQuestionsRedisSeed from './reply-questions-redis-seed'

const makeFakeQuestions = (): QuestionModel[] => ([
  {
    id: 'any_id',
    content: 'any_content',
    alternatives: makeFakeAlternatives()
  }, {
    id: 'other_id', content: 'other_content'
  }
])

const makeFakeAlternatives = (): AlternativeModel[] => ([
  {
    id: 'any_alternative_id',
    description: 'any_description',
    questionId: 'any_id'
  }, {
    id: 'other_alternative_id',
    description: 'other_description',
    questionId: 'any_id'
  }
])

let redis: Redis
let prismock: PrismaClient

describe('AddManyQuestionsPrisma Seed', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getCli').mockReturnValue(
      Promise.resolve(prismock)
    )
    redis = new RedisMock()
    jest.spyOn(RedisHelper, 'getInstance').mockReturnValue(redis)
  })

  beforeEach(async () => {
    await prismock.question.deleteMany()
    await prismock.alternative.deleteMany()
    await redis.flushall()
  })

  afterAll(async () => {
    await prismock.$disconnect()
    redis.disconnect()
  })

  it('Should replicate DB Questions in Redis', async () => {
    const data: QuestionModel[] = makeFakeQuestions().map(
      ({ id, content }) => ({ id, content })
    )
    await prismock.question.createMany({ data })
    await prismock.alternative.createMany({ data: makeFakeAlternatives() })
    await replyQuestionsRedisSeed
    const questionsJson = await redis.get('questions') as string
    const questions = JSON.parse(questionsJson)
    expect(questions).toEqual(makeFakeQuestions())
  })
})
