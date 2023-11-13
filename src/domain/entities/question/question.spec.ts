import { Question, Question as sut } from './question'
import { BusinessDescription, LocationOrTargetAudience, TypeOfBusiness } from './value-objects'

jest.mock('@/domain/entities/question/value-objects/contents/type-of-business/type-of-business', () => ({
  TypeOfBusiness: {
    getContent: jest.fn().mockReturnValue('any_type_of_business')
  }
}))

jest.mock('@/domain/entities/question/value-objects/contents/location-or-target-audience/location-or-target-audience', () => ({
  LocationOrTargetAudience: {
    getContent: jest.fn().mockReturnValue('any_location_or_target_audience')
  }
}))

jest.mock('@/domain/entities/question/value-objects/contents/business-description/business-description', () => ({
  BusinessDescription: {
    getContent: jest.fn().mockReturnValue('any_business_description')
  }
}))

describe('Question Entity', () => {
  it('Should call TypeOfBusiness', () => {
    const getContentSpy = jest.spyOn(TypeOfBusiness, 'getContent')
    sut.createMany()
    expect(getContentSpy).toHaveBeenCalled()
  })

  it('Should call LocationOrTargetAudience', () => {
    const getContentSpy = jest.spyOn(LocationOrTargetAudience, 'getContent')
    sut.createMany()
    expect(getContentSpy).toHaveBeenCalled()
  })

  it('Should call BusinessDescription', () => {
    const getContentSpy = jest.spyOn(BusinessDescription, 'getContent')
    sut.createMany()
    expect(getContentSpy).toHaveBeenCalled()
  })

  it('Should return the correct content for a Question', () => {
    const question = Question.create('any_content')
    const content = Question.getContent(question)
    expect(content).toBe('any_content')
  })

  it('Should create many Questions', () => {
    const questions = sut.createMany()
    expect(questions).toEqual([
      { content: 'any_type_of_business' },
      { content: 'any_location_or_target_audience' },
      { content: 'any_business_description' }
    ])
  })
})
