import type { AddAnswer, CreateBusinessCanvas, CreateBusinessCanvasDto, CreateBusinessCanvasRes } from '@/domain/contracts'
import { left, right } from '@/shared/either'

export class CreateBusinessCanvasUseCase implements CreateBusinessCanvas {
  constructor (private readonly addAnswer: AddAnswer) {}

  async perform (dto: CreateBusinessCanvasDto): Promise<CreateBusinessCanvasRes> {
    const addAnswerResult = await this.addAnswer.perform(dto)
    if (addAnswerResult.isLeft()) {
      return left(addAnswerResult.value)
    }
    const object: any = ''
    return right(object)
  }
}
