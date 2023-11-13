import 'module-alias/register'
import { addManyQuestionsUseCaseFactory } from '../factories/usecases/add-many-questions-usecase-factory'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'

const addManyQuestionsPrismaSeed = async (): Promise<void> => {
  await PrismaHelper.connect()
  await addManyQuestionsUseCaseFactory().perform()
}

export default addManyQuestionsPrismaSeed()
  .then(() => { console.log('Questions added successfully') })
  .catch(console.error)
  .finally(async () => { await PrismaHelper.disconnect() })
