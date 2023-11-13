export class QuestionContent {
  private constructor (private readonly content: string) {
    Object.freeze(this)
  }

  static create (content: string): QuestionContent {
    return new QuestionContent(content)
  }
}
