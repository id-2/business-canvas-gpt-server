import type { AddManyQuestions } from '@/domain/contracts'
import type { AlternativeModel, QuestionModel } from '@/domain/models/db-models'
import type { AddManyQuestionsRepo } from '@/interactions/contracts/db'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import { Alternative } from '@/domain/entities/alternative/alternative'
import { Question } from '@/domain/entities/question/question'

export class AddManyQuestionsUseCase implements AddManyQuestions {
  constructor (
    private readonly idBuilder: IdBuilder,
    private readonly addManyQuestionsRepo: AddManyQuestionsRepo
  ) {}

  async perform (): Promise<void> {
    const questions = Question.createMany()
    const questionsModel = this.getQuestionsModel(questions)
    await this.addManyQuestionsRepo.addMany(questionsModel)
  }

  private getQuestionsModel (questions: Question[]): QuestionModel[] {
    const questionsModel: QuestionModel[] = []
    for (const question of questions) {
      const questionId = this.idBuilder.build().id
      const alternatives = Question.getQuestion(question)?.alternatives
      const alternativesModel: AlternativeModel[] = []
      if (alternatives && alternatives.length > 0) {
        alternatives.forEach((alternative) => {
          alternativesModel.push({
            id: this.idBuilder.build().id,
            description: Alternative.getDescription(alternative) as string,
            questionId
          })
        })
        questionsModel.push({
          id: questionId,
          content: Question.getQuestion(question)?.content as string,
          alternatives: alternativesModel
        })
      } else {
        questionsModel.push({
          id: questionId,
          content: Question.getQuestion(question)?.content as string
        })
      }
    }
    return questionsModel
  }
}
