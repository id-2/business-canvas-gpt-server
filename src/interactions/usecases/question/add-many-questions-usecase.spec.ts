import { Question } from '@/domain/entities/question/question'
import { AddManyQuestionsUseCase } from './add-many-questions-usecase'

interface SutTypes {
  sut: AddManyQuestionsUseCase
}

const makeSut = (): SutTypes => {
  const sut = new AddManyQuestionsUseCase()
  return { sut }
}

describe('AddManyQuestions UseCase', () => {
  it('Should call Question Entity ', async () => {
    const { sut } = makeSut()
    const createManySpy = jest.spyOn(Question, 'createMany')
    await sut.perform()
    expect(createManySpy).toHaveBeenCalled()
  })
})
