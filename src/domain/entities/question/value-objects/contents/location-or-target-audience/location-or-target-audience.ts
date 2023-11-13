export class LocationOrTargetAudience {
  private static content: string

  private static setContent (): void {
    if (!this.content) {
      this.content =
      'Qual a localização ou público para o qual deseja trabalhar (Cidade, estado ou país)?'
    }
  }

  static getContent (): string {
    this.setContent()
    return this.content
  }
}
