export class InvalidAlternativeIdError extends Error {
  constructor (alternativeId: string) {
    super(`Alternative with ID '${alternativeId}' invalid`)
    this.name = 'InvalidAlternativeIdError'
  }
}
