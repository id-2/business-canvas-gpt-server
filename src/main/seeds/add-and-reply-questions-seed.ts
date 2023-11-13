import 'module-alias/register'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { addManyQuestionsUseCaseFactory } from '../factories/usecases/add-many-questions-usecase-factory'

const addAndReplyQuestionsSeed = async (): Promise<void> => {
  await PrismaHelper.connect()
  await addManyQuestionsUseCaseFactory().perform()
}

export default addAndReplyQuestionsSeed()
  .then()
  .catch(console.error)
  .finally(async () => {
    await PrismaHelper.disconnect()
  })
