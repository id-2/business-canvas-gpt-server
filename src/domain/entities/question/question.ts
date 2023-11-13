import { Alternative } from '../alternative/alternative'
import type { QuestionEntityModel } from './question-entity-model'

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
      'Qual a localização ou público para o qual deseja trabalhar (Cidade, estado ou país)?',
      'Descreva seu negócio:'
    ]
    const questions = contents.map(content => this.create({ content }))
    const alternatives: Alternative[] = [
      Alternative.create('Presencial'), Alternative.create('Online')
    ]
    const question = this.create({
      content: 'Qual o tipo do seu negócio?', alternatives
    })
    return [question, ...questions]
  }
}
