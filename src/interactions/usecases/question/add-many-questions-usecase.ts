import type { AddManyQuestions } from '@/domain/contracts'
import { Question } from '@/domain/entities/question/question'

export class AddManyQuestionsUseCase implements AddManyQuestions {
  async perform (): Promise<void> {
    Question.createMany()
  }
}
