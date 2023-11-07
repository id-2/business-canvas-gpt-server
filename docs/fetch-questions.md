# Busca das Perguntas

## Descrição

Esta funcionalidade permite aos usuários acessarem um conjunto de questões relevantes com base no tipo de negócio que possuem. As respostas a essas questões serão usadas para criar um Business Canvas personalizado.

## Endpoint

`GET /api/questions`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter o token de autenticação do usuário para identificar quem está respondendo às perguntas.

- **Authorization** (string): Token de autenticação do usuário.


## Caso de sucesso

- ❌ Recupera com sucesso um conjunto de questões relevantes já cadastradas no sistema.

### Resposta

- ❌ Código de status: **200 OK**
- ❌ Corpo da resposta: Um objeto JSON contendo as questões relevantes.

Exemplo:

```json
{
  "questions": [
    {
      "id": "123",
      "questionContent": "Qual o tipo do seu negócio?",
      "alternatives": [
        {
          "id": "123",
          "name": "Presencial",
        },
        {
          "id": "1234",
          "name": "Online"
        },
      ]
    },
    {
      "id": "1234",
      "questionContent": "Onde está localizado seu público?"
    },
    {
      "id": "1234",
      "questionContent": "Qual o Público-alvo?"
    },
    {
      "id": "12345",
      "questionContent": "Descreva seu negócio."
    },
  ]
}
```

## Casos de Exceção

### Respostas
- Código de status: **401 Unauthorized**
  - ❌ Se o cabeçalho de autorização estiver ausente ou inválido.
  - ❌ Se o token de autenticação for inválido ou expirado.
  - ❌ Se o usuário não estiver autenticado na plataforma.
- Código de status: **404 Not Found**
  - ❌ Se não encontrar as questões.
- Código de status: **500 Internal Server Error**
  - ❌ Em caso de erro interno no servidor.
