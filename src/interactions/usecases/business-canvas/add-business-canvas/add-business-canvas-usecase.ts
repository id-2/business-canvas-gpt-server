import type { AddBusinessCanvas, AddBusinessCanvasDto } from '@/domain/contracts'
import type { AddBusinessCanvasRepo } from '@/interactions/contracts/db'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'

export class AddBusinessCanvasUseCase implements AddBusinessCanvas {
  constructor (
    private readonly idBuilder: IdBuilder,
    private readonly addBusinessCanvasRepo: AddBusinessCanvasRepo
  ) {}

  async perform (dto: AddBusinessCanvasDto): Promise<void> {
    this.idBuilder.build()
  }
}
