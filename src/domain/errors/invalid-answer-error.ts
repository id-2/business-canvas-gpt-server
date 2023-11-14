export class InvalidAnswerError extends Error {
  constructor (answer: string) {
    super(`Answer '${answer}' invalid`)
    this.name = 'InvalidAnswerError'
  }
}
