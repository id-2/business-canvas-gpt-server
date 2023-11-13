import type { QuestionEntityModel } from './question-entity-model'
import { BusinessDescription, LocationOrTargetAudience, TypeOfBusiness } from './value-objects'
import { Alternative } from '../alternative/alternative'

export class Question {
  private static readonly contents: string[] = []

  private constructor (
    private readonly question: QuestionEntityModel
  ) {
    Question.contents.push(this.question.content)
    Object.freeze(this)
  }

  static getContent (data: Question): string | undefined {
    return Question.contents.find((content) => content === data.question.content)
  }

  static create (data: QuestionEntityModel): Question {
    return new Question(data)
  }

  static createMany (): Question[] {
    const contents = [
      LocationOrTargetAudience.getContent(),
      BusinessDescription.getContent()
    ]
    const questions = contents.map(content => this.create({ content }))
    const question = this.createQuestionWithAlternatives()
    return [question, ...questions]
  }

  private static createQuestionWithAlternatives (): Question {
    const alternatives: Alternative[] = [
      Alternative.create('Presencial'), Alternative.create('Online')
    ]
    const question = this.create({
      content: TypeOfBusiness.getContent(), alternatives
    })
    return question
  }
}
