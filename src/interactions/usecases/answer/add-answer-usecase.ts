import type { AddAnswer, AddAnswerDto } from '@/domain/contracts'
import type { AddAnswerRepo } from '@/interactions/contracts/db'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'

export class AddAnswerUseCase implements AddAnswer {
  constructor (
    private readonly idBuilder: IdBuilder,
    private readonly addAnswerRepo: AddAnswerRepo
  ) {}

  async perform (dto: AddAnswerDto): Promise<void> {
    const { id } = this.idBuilder.build()
    await this.addAnswerRepo.add({ id, ...dto })
  }
}
