import type { AddAnswer, CreateBusinessCanvas, CreateBusinessCanvasDto, CreateBusinessCanvasRes } from '@/domain/contracts'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { QuestionsNotFoundError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { Answer } from '@/domain/entities/answer/answer'

export class CreateBusinessCanvasUseCase implements CreateBusinessCanvas {
  constructor (
    private readonly fetchAllQuestionsRepo: FetchAllQuestionsRepo,
    private readonly addAnswer: AddAnswer
  ) {}

  async perform (dto: CreateBusinessCanvasDto): Promise<CreateBusinessCanvasRes> {
    const questions = await this.fetchAllQuestionsRepo.fetchAll()
    if (questions.length === 0) {
      throw new QuestionsNotFoundError()
    }
    Answer.createMany({ userAnswers: dto.answers, questions })
    const addAnswerResult = await this.addAnswer.perform(dto)
    if (addAnswerResult.isLeft()) {
      return left(addAnswerResult.value)
    }
    const object: any = ''
    return right(object)
  }
}
