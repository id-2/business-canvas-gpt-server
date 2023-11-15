import type { AddAnswer, AddAnswerDto } from '@/domain/contracts'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'

export class AddAnswerUseCase implements AddAnswer {
  constructor (private readonly idBuilder: IdBuilder) {}

  async perform (dto: AddAnswerDto): Promise<void> {
    this.idBuilder.build()
  }
}
