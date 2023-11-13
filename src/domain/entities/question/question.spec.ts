import { Question, Question as sut } from './question'

describe('Question Entity', () => {
  it('Should return the correct content for a Question', () => {
    const question = Question.create({ content: 'any_content' })
    const result = Question.getQuestion(question)
    expect(result?.content).toBe('any_content')
  })

  it('Should create many Questions', () => {
    const questions = sut.createMany()
    expect(questions).toEqual([
      {
        question: {
          content: 'Qual o tipo do seu negócio?',
          alternatives: [
            { description: 'Presencial' },
            { description: 'Online' }
          ]
        }
      },
      {
        question: {
          content: 'Qual a localização ou público para o qual deseja trabalhar (Cidade, estado ou país)?'
        }
      },
      {
        question: { content: 'Descreva seu negócio:' }
      }
    ])
  })
})
