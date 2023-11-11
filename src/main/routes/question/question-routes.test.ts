import type { QuestionModel } from '@/domain/models/db-models'
import type { Redis } from 'ioredis'
import { RedisHelper } from '@/infra/cache/redis/helpers/redis-helper'
import RedisMock from 'ioredis-mock'
import request from 'supertest'
import app from '@/main/configs/app'

const makeFakeQuestions = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

let redis: Redis

describe('Question Routes', () => {
  beforeAll(async () => {
    redis = new RedisMock()
    jest.spyOn(RedisHelper, 'getInstance').mockReturnValue(redis)
  })

  beforeEach(async () => {
    await redis.flushall()
  })

  afterAll(async () => {
    redis.disconnect()
  })

  describe('GET /question', () => {
    it('Should return 200 on fetch all questions', async () => {
      await redis.set('questions', JSON.stringify(makeFakeQuestions()))
      await request(app)
        .get('/api/question')
        .send()
        .expect(200)
    })
  })
})
