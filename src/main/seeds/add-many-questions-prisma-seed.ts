import 'module-alias/register'
import { addManyQuestionsUseCaseFactory } from '../factories/usecases/add-many-questions-usecase-factory'

export const addManyQuestionsPrismaSeed = async (): Promise<void> => {
  await addManyQuestionsUseCaseFactory().perform()
}

addManyQuestionsPrismaSeed()
  .then(() => { console.log('Questions added successfully') })
  .catch(console.error)
