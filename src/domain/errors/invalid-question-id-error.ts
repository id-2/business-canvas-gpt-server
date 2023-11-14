export class InvalidQuestionIdError extends Error {
  constructor (questionId: string) {
    super(`Question with ID '${questionId}' invalid`)
    this.name = 'InvalidQuestionIdError'
  }
}
