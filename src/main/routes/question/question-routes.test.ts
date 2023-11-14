/**
 * @jest-environment ./src/main/configs/prisma-jest/prisma-environment-jest.ts
 */

import type { QuestionModel, UserModel } from '@/domain/models/db-models'
import type { Redis } from 'ioredis'
import type { PrismaClient } from '@prisma/client'
import { RedisHelper } from '@/infra/cache/redis/helpers/redis-helper'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { sign } from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import RedisMock from 'ioredis-mock'
import request from 'supertest'
import app from '@/main/configs/app'
import env from '@/main/configs/env'

const makeFakeQuestions = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

const userId = uuid()

const makeUserModel = (): UserModel => ({
  id: userId,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date()
})

const makeAccessToken = async (): Promise<string> => {
  const accessToken = sign({ value: userId }, env.jwtSecretKey)
  return accessToken
}

let redis: Redis
let prisma: PrismaClient

describe('Question Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getCli()
    redis = new RedisMock()
    jest.spyOn(RedisHelper, 'getInstance').mockReturnValue(redis)
  })

  beforeEach(async () => {
    await prisma.user.deleteMany()
    await redis.flushall()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
    redis.disconnect()
  })

  describe('GET /question', () => {
    it('Should return 200 on fetch all questions', async () => {
      await prisma.user.create({ data: makeUserModel() })
      await redis.set('questions', JSON.stringify(makeFakeQuestions()))
      await request(app)
        .get('/api/question')
        .set('x-access-token', await makeAccessToken())
        .expect(200)
    })
  })
})
