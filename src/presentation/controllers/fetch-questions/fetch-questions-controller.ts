import type { HttpRequest, HttpResponse } from '@/presentation/http/http'
import type { FetchQuestions } from '@/domain/contracts'
import type { Controller } from '@/presentation/contracts'
import { notFound } from '@/presentation/helpers/http/http-helpers'

export class FetchQuestionsController implements Controller {
  constructor (private readonly fetchQuestions: FetchQuestions) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const fetchQuestionsResult = await this.fetchQuestions.perform()
    if (fetchQuestionsResult.isLeft()) {
      return notFound(fetchQuestionsResult.value)
    }
    return { statusCode: 0, body: '' }
  }
}
