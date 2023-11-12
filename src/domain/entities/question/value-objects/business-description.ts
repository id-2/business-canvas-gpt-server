export class BusinessDescription {
  private static value: string

  private constructor (private readonly content: string) {
    Object.freeze(this)
  }

  private static setValeu (): void {
    this.value = 'Descreva seu negócio:'
  }

  static create (): BusinessDescription {
    this.setValeu()
    return new BusinessDescription(this.value)
  }
}
