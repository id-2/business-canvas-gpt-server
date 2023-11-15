import type { IdModel } from '@/domain/models/output-models'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { AddBusinessCanvasDto } from '@/domain/contracts'
import { AddBusinessCanvasUseCase } from './add-business-canvas-usecase'

const makeFakeAddBusinessCanvasDto = (): AddBusinessCanvasDto => ({
  userId: 'any_user_id',
  name: 'any_business_canvas_name',
  customerSegments: ['any_customer_segments'],
  valuePropositions: ['any_value_propositions'],
  channels: ['any_channels'],
  customerRelationships: ['any_customer_relationships'],
  revenueStreams: ['any_revenue_streams'],
  keyResources: ['any_key_resources'],
  keyActivities: ['any_key_activities'],
  keyPartnerships: ['any_key_partnerships'],
  costStructure: ['any_cost_structure']
})

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): IdModel {
      return { id: 'any_id' }
    }
  }
  return new IdBuilderStub()
}

interface SutTypes {
  sut: AddBusinessCanvasUseCase
  idBuilderStub: IdBuilder
}

const makeSut = (): SutTypes => {
  const idBuilderStub = makeIdBuilder()
  const sut = new AddBusinessCanvasUseCase(idBuilderStub)
  return { sut, idBuilderStub }
}

describe('AddBusinessCanvas UseCase', () => {
  it('Should call IdBuilder', async () => {
    const { sut, idBuilderStub } = makeSut()
    const buildSpy = jest.spyOn(idBuilderStub, 'build')
    await sut.perform(makeFakeAddBusinessCanvasDto())
    expect(buildSpy).toHaveBeenCalled()
  })

  it('Should throw if IdBuilder throws', async () => {
    const { sut, idBuilderStub } = makeSut()
    jest.spyOn(idBuilderStub, 'build').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform(makeFakeAddBusinessCanvasDto())
    await expect(promise).rejects.toThrow()
  })
})
