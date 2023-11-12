export class TypeOfBusiness {
  private static value: string

  private constructor (private readonly content: string) {
    Object.freeze(this)
  }

  private static setValeu (): void {
    this.value = 'Qual o tipo do seu negócio?'
  }

  static create (): TypeOfBusiness {
    this.setValeu()
    return new TypeOfBusiness(this.value)
  }
}
