/**
 * @jest-environment ./src/main/configs/prisma-jest/prisma-environment-jest.ts
 */

import type { PrismaClient } from '@prisma/client'
import type { Redis } from 'ioredis'
import { RedisHelper } from '@/infra/cache/redis/helpers/redis-helper'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import RedisMock from 'ioredis-mock'
import addAndReplyQuestionsSeed from './add-and-reply-questions-seed'

let redis: Redis
let prisma: PrismaClient

describe('AddManyQuestionsPrisma Seed', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getCli()
    redis = new RedisMock()
    jest.spyOn(RedisHelper, 'getInstance').mockReturnValue(redis)
  })

  beforeEach(async () => {
    await prisma.question.deleteMany()
    await prisma.alternative.deleteMany()
    await redis.flushall()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    redis.disconnect()
  })

  it('Should add all Questions in DB with Prisma', async () => {
    await addAndReplyQuestionsSeed
    const questions = await prisma.question.findMany()
    const alternatives = await prisma.alternative.findMany()
    expect(questions.length).toBe(3)
    expect(alternatives.length).toBe(2)
  })
})
