import { BusinessDescription, LocationOrTargetAudience, TypeOfBusiness } from './value-objects'

export class Question {
  private static readonly contents: string[] = []

  private constructor (
    private readonly content: string
  ) {
    Question.contents.push(this.content)
    Object.freeze(this)
  }

  static getContent (question: Question): string | undefined {
    return Question.contents.find((content) => content === question.content)
  }

  static create (content: string): Question {
    return new Question(content)
  }

  static createMany (): Question[] {
    const contents = [
      TypeOfBusiness.getContent(),
      LocationOrTargetAudience.getContent(),
      BusinessDescription.getContent()
    ]
    const questions = []
    for (const content of contents) {
      questions.push(this.create(content))
    }
    return questions
  }
}
