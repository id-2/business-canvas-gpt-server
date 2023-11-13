import { Question } from './question'
import { BusinessDescription, LocationOrTargetAudience, TypeOfBusiness } from './value-objects'

jest.mock('@/domain/entities/question/value-objects/type-of-business/type-of-business', () => ({
  TypeOfBusiness: {
    getContent: jest.fn().mockReturnValue('any_type_of_business')
  }
}))

jest.mock('@/domain/entities/question/value-objects/location-or-target-audience/location-or-target-audience', () => ({
  LocationOrTargetAudience: {
    getContent: jest.fn().mockReturnValue('any_location_or_target_audience')
  }
}))

jest.mock('@/domain/entities/question/value-objects/business-description/business-description', () => ({
  BusinessDescription: {
    getContent: jest.fn().mockReturnValue('any_business_description')
  }
}))

describe('Question Entity', () => {
  it('Should call TypeOfBusiness', () => {
    const getContentSpy = jest.spyOn(TypeOfBusiness, 'getContent')
    Question.createMany()
    expect(getContentSpy).toHaveBeenCalled()
  })

  it('Should call LocationOrTargetAudience', () => {
    const getContentSpy = jest.spyOn(LocationOrTargetAudience, 'getContent')
    Question.createMany()
    expect(getContentSpy).toHaveBeenCalled()
  })

  it('Should call BusinessDescription', () => {
    const getContentSpy = jest.spyOn(BusinessDescription, 'getContent')
    Question.createMany()
    expect(getContentSpy).toHaveBeenCalled()
  })
})
