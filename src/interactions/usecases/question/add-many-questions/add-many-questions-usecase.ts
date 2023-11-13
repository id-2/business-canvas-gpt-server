import type { AddManyQuestions } from '@/domain/contracts'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { AddManyQuestionsRepo } from '@/interactions/contracts/db'
import type { QuestionModel } from '@/domain/models/db-models'
import { Question } from '@/domain/entities/question/question'

export class AddManyQuestionsUseCase implements AddManyQuestions {
  constructor (
    private readonly idBuilder: IdBuilder,
    private readonly addManyQuestionsRepo: AddManyQuestionsRepo
  ) {}

  async perform (): Promise<void> {
    const questions = Question.createMany()
    const questionsModel: QuestionModel[] = []
    for (const question of questions) {
      questionsModel.push({
        id: this.idBuilder.build().id,
        content: Question.getQuestion(question)?.content as string
      })
    }
    await this.addManyQuestionsRepo.addMany(questionsModel)
  }
}
