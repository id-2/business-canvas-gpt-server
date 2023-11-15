import type { GenerateInputToCreateBusinessCanvasDto } from './generate-input-to-create-business-canvas'
import { GenerateInputToCreateBusinessCanvas as sut } from './generate-input-to-create-business-canvas'
import { TemplateForInputInPersonBusiness } from './input-templates'

const makeFakeGenerateInputDto = (): GenerateInputToCreateBusinessCanvasDto => ({
  typeOfBusiness: 'in_person',
  businessDescription: 'description_answer',
  locationOrTargetAudience: 'location_answer'
})

describe('GenerateInputToCreateBusinessCanvas', () => {
  it('Should call TemplateForInputInPersonBusiness', async () => {
    const createSpy = jest.spyOn(TemplateForInputInPersonBusiness, 'create')
    sut.execute(makeFakeGenerateInputDto())
    expect(createSpy).toHaveBeenCalled()
  })
})
