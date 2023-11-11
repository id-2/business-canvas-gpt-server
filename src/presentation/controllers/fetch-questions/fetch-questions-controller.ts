import type { HttpRequest, HttpResponse } from '@/presentation/http/http'
import type { FetchQuestions } from '@/domain/contracts'
import type { Controller } from '@/presentation/contracts'

export class FetchQuestionsController implements Controller {
  constructor (private readonly fetchQuestions: FetchQuestions) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.fetchQuestions.perform()
    return { statusCode: 0, body: '' }
  }
}
