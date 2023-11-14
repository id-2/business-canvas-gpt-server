import type { AddAnswer, CreateBusinessCanvas, CreateBusinessCanvasDto, CreateBusinessCanvasRes } from '@/domain/contracts'
import { right } from '@/shared/either'

export class CreateBusinessCanvasUseCase implements CreateBusinessCanvas {
  constructor (private readonly addAnswer: AddAnswer) {}

  async perform (dto: CreateBusinessCanvasDto): Promise<CreateBusinessCanvasRes> {
    await this.addAnswer.perform(dto)
    const object: any = ''
    return right(object)
  }
}
