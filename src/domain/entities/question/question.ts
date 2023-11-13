import { BusinessDescription, LocationOrTargetAudience, TypeOfBusiness } from './value-objects'

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
