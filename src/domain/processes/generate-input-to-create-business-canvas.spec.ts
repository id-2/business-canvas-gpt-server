import type { GenerateInputToCreateBusinessCanvasDto } from './generate-input-to-create-business-canvas'
import { GenerateInputToCreateBusinessCanvas as sut } from './generate-input-to-create-business-canvas'
import { TemplateForInputWithLocation } from './input-template/template-for-input-with-location'

const makeFakeGenerateInputDto = (): GenerateInputToCreateBusinessCanvasDto => ({
  typeOfBusiness: 'in_person',
  businessDescription: 'description_answer',
  locationOrTargetAudience: 'location_answer'
})

describe('GenerateInputToCreateBusinessCanvas', () => {
  it('Should call TemplateForInputWithLocation', async () => {
    const createSpy = jest.spyOn(TemplateForInputWithLocation, 'create')
    sut.execute(makeFakeGenerateInputDto())
    expect(createSpy).toHaveBeenCalled()
  })
})
