import { BusinessDescription } from './value-objects'

export class Question {
  private constructor (
    private readonly content: string
  ) {
    Object.freeze(this)
  }

  private static create (content: string): Question {
    return new Question(content)
  }

  static createMany (): Question[] {
    BusinessDescription.create()
    return [new Question('')]
  }
}
