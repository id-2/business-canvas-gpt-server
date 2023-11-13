import type { AddManyQuestions } from '@/domain/contracts'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import { Question } from '@/domain/entities/question/question'

export class AddManyQuestionsUseCase implements AddManyQuestions {
  constructor (private readonly idBuilder: IdBuilder) {}

  async perform (): Promise<void> {
    this.idBuilder.build()
    Question.createMany()
  }
}
