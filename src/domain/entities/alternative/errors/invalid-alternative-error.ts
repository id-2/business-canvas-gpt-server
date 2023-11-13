export class InvalidAlternativeError extends Error {
  constructor (alternative: string) {
    super(`The alternative '${alternative}' is invalid`)
    this.name = 'InvalidAlternativeError'
  }
}
