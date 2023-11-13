export class Alternative {
  private constructor (private readonly description: string) {
    Object.freeze(this)
  }

  static create (description: string): Alternative {
    return new Alternative(description)
  }
}
