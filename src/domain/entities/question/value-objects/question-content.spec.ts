import { QuestionContent } from './question-content'

describe('QuestionContent ValueObject', () => {
  it('Should return new QuestionContent', () => {
    const sut = QuestionContent.create('any_content')
    expect(sut).toEqual({ content: 'any_content' })
  })
})
