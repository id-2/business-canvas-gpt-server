export class BusinessDescription {
  private static content: string

  private static setContent (): void {
    if (!this.content) {
      this.content = 'Descreva seu negócio:'
    }
  }

  static getContent (): string {
    this.setContent()
    return this.content
  }
}
