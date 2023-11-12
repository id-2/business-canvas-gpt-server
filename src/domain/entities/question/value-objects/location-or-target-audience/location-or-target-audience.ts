export class LocationOrTargetAudience {
  private static value: string

  private constructor (private readonly content: string) {
    Object.freeze(this)
  }

  private static setValeu (): void {
    this.value = 'Qual a localização ou público para o qual deseja trabalhar (Cidade, estado ou país)?'
  }

  static create (): LocationOrTargetAudience {
    this.setValeu()
    return new LocationOrTargetAudience(this.value)
  }
}
