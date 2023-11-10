export class InvalidCreadentialsError extends Error {
  constructor () {
    super('Invalid email or password ')
    this.name = 'InvalidCreadentialsError'
  }
}
