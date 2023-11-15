import type { AddBusinessCanvas, AddBusinessCanvasDto } from '@/domain/contracts'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'

export class AddBusinessCanvasUseCase implements AddBusinessCanvas {
  constructor (private readonly idBuilder: IdBuilder) {}

  async perform (dto: AddBusinessCanvasDto): Promise<void> {
    this.idBuilder.build()
  }
}
