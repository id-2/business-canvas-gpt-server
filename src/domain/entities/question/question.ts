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
    TypeOfBusiness.getContent()
    LocationOrTargetAudience.getContent()
    BusinessDescription.getContent()
    return [new Question('')]
  }
}
