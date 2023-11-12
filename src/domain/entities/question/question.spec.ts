import { Question } from './question'
import { BusinessDescription } from './value-objects'

jest.mock('@/domain/entities/question/value-objects/business-description/business-description', () => ({
  BusinessDescription: {
    create: jest.fn().mockReturnValue('any_business_description')
  }
}))

describe('Question Entity', () => {
  it('Should call BusinessDescription', () => {
    const createSpy = jest.spyOn(BusinessDescription, 'create')
    Question.createMany()
    expect(createSpy).toHaveBeenCalled()
  })
})
