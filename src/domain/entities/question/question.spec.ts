import { Question } from './question'
import { BusinessDescription, LocationOrTargetAudience, TypeOfBusiness } from './value-objects'

jest.mock('@/domain/entities/question/value-objects/type-of-business/type-of-business', () => ({
  TypeOfBusiness: {
    create: jest.fn().mockReturnValue('any_type_of_business')
  }
}))

jest.mock('@/domain/entities/question/value-objects/location-or-target-audience/location-or-target-audience', () => ({
  LocationOrTargetAudience: {
    create: jest.fn().mockReturnValue('any_location_or_target_audience')
  }
}))

jest.mock('@/domain/entities/question/value-objects/business-description/business-description', () => ({
  BusinessDescription: {
    create: jest.fn().mockReturnValue('any_business_description')
  }
}))

describe('Question Entity', () => {
  it('Should call TypeOfBusiness', () => {
    const createSpy = jest.spyOn(TypeOfBusiness, 'create')
    Question.createMany()
    expect(createSpy).toHaveBeenCalled()
  })

  it('Should call LocationOrTargetAudience', () => {
    const createSpy = jest.spyOn(LocationOrTargetAudience, 'create')
    Question.createMany()
    expect(createSpy).toHaveBeenCalled()
  })

  it('Should call BusinessDescription', () => {
    const createSpy = jest.spyOn(BusinessDescription, 'create')
    Question.createMany()
    expect(createSpy).toHaveBeenCalled()
  })
})
