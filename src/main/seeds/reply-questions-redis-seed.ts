import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { replyQuestionsUseCaseFactory } from '../factories/usecases/reply-questions-usecase-factory'
import { RedisHelper } from '@/infra/cache/redis/helpers/redis-helper'

const replyQuestionsRedisSeed = async (): Promise<void> => {
  await PrismaHelper.connect()
  RedisHelper.connect()
  await replyQuestionsUseCaseFactory().perform()
}

export default replyQuestionsRedisSeed()
  .then(() => { console.log('Questions added successfully') })
  .catch(console.error)
  .finally(async () => {
    await RedisHelper.disconnect()
    await PrismaHelper.disconnect()
  })
