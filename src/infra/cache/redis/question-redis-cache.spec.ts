import type { Redis } from 'ioredis'
import type { QuestionModel } from '@/domain/models/db-models'
import { QuestionRedisCache } from './question-redis-cache'
import { RedisHelper } from './helpers/redis-helper'
import RedisMock from 'ioredis-mock'

const makeFakeQuestions = (): QuestionModel[] => ([
  { id: 'any_id', content: 'any_content' },
  { id: 'other_id', content: 'other_content' }
])

const makeSut = (): QuestionRedisCache => {
  return new QuestionRedisCache()
}

let redis: Redis

describe('StockSymbolsRedis Cache', () => {
  beforeAll(() => {
    redis = new RedisMock()
    jest.spyOn(RedisHelper, 'getInstance').mockReturnValue(redis)
  })

  afterAll(() => {
    redis.disconnect()
  })

  beforeEach(async () => {
    await redis.flushall()
  })

  it('Should fetch all questions', async () => {
    const sut = makeSut()
    await redis.set('questions', JSON.stringify(makeFakeQuestions()))
    const questions = await sut.fetchAll()
    expect(questions).toEqual(makeFakeQuestions())
  })
})
