import type { GenerateInputToCreateBusinessCanvasDto } from './generate-input-to-create-business-canvas'
import { GenerateInputToCreateBusinessCanvas as sut } from './generate-input-to-create-business-canvas'
import { TemplateForInputInPersonBusiness, TemplateForInputOnlineBusiness } from './input-templates'

jest.mock('@/domain/processes/input-templates/input-in-person-business/template-for-input-in-person-business', () => ({
  TemplateForInputInPersonBusiness: {
    create: jest.fn(() => ('any_input'))
  }
}))

jest.mock('@/domain/processes/input-templates/input-online-business/template-for-input-online-business', () => ({
  TemplateForInputOnlineBusiness: {
    create: jest.fn(() => ('other_input'))
  }
}))

const makeFakeGenerateInputDto = (): GenerateInputToCreateBusinessCanvasDto => ({
  typeOfBusiness: 'in_person',
  businessDescription: 'description_answer',
  locationOrTargetAudience: 'location_answer'
})

describe('GenerateInputToCreateBusinessCanvas', () => {
  it('Should call TemplateForInputInPersonBusiness if locationOrTargetAudience is provided', async () => {
    const createSpy = jest.spyOn(TemplateForInputInPersonBusiness, 'create')
    sut.execute(makeFakeGenerateInputDto())
    expect(createSpy).toHaveBeenCalled()
  })

  it('Should not call TemplateForInputInPersonBusiness if locationOrTargetAudience not provided', async () => {
    const createSpy = jest.spyOn(TemplateForInputInPersonBusiness, 'create')
    sut.execute({
      typeOfBusiness: 'in_person',
      businessDescription: 'description_answer'
    })
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('Should call TemplateForInputOnlineBusiness if locationOrTargetAudience not provided', async () => {
    const createSpy = jest.spyOn(TemplateForInputOnlineBusiness, 'create')
    sut.execute({
      typeOfBusiness: 'in_person',
      businessDescription: 'description_answer'
    })
    expect(createSpy).toHaveBeenCalled()
  })

  it('Should not call TemplateForInputOnlineBusiness if locationOrTargetAudience is provided', async () => {
    const createSpy = jest.spyOn(TemplateForInputOnlineBusiness, 'create')
    sut.execute(makeFakeGenerateInputDto())
    expect(createSpy).not.toHaveBeenCalled()
  })
})
