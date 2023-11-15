import type { AddAnswer, AddRandomUser, CreateBusinessCanvas, CreateBusinessCanvasDto, CreateBusinessCanvasRes } from '@/domain/contracts'
import type { FetchAllQuestionsRepo } from '@/interactions/contracts/db'
import { QuestionsNotFoundError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { Answer } from '@/domain/entities/answer/answer'
import { BusinessCanvasDataBuilder } from '@/domain/processes/business-canvas-data-builder'

export class CreateBusinessCanvasUseCase implements CreateBusinessCanvas {
  constructor (
    private readonly fetchAllQuestionsRepo: FetchAllQuestionsRepo,
    private readonly addRandomUser: AddRandomUser,
    private readonly addAnswer: AddAnswer
  ) {}

  async perform (dto: CreateBusinessCanvasDto): Promise<CreateBusinessCanvasRes> {
    const questions = await this.fetchAllQuestionsRepo.fetchAll()
    if (questions.length === 0) {
      throw new QuestionsNotFoundError()
    }
    const answerResult = Answer.createMany({ userAnswers: dto.answers, questions })
    if (answerResult.isLeft()) {
      return left(answerResult.value)
    }
    let userId = dto.userId as string
    if (!dto.userId) {
      const { id } = await this.addRandomUser.perform()
      userId = id
    }
    const addAnswerDto = { userId, answers: dto.answers }
    const addAnswerResult = await this.addAnswer.perform(addAnswerDto)
    if (addAnswerResult.isLeft()) {
      return left(addAnswerResult.value)
    }
    BusinessCanvasDataBuilder.execute({ userAnswers: dto.answers, questions })
    const object: any = ''
    return right(object)
  }
}
