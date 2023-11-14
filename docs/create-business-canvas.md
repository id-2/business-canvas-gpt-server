# Criar um Business Canvas a partir das Respostas do Usuário

## Descrição

Esta funcionalidade permite aos usuários responderem às questões relevantes com base no tipo de negócio que possuem. As respostas serão usadas para criar um Business Canvas personalizado.

## Endpoint

`POST /api/business-canvas`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter o token de autenticação do usuário para identificar quem está respondendo às perguntas.

- **x-access-token** (string): Token de autenticação do usuário.

## Corpo da Requisição

O corpo da requisição deve conter um array de objetos, cada um representando uma resposta a uma pergunta.

Exemplo:

```json
[
  {
    "questionId": "123",
    "answer": "Presencial"
  },
  {
    "questionId": "1234",
    "answer": "Em São Paulo"
  },
  {
    "questionId": "1235",
    "alternativeId": "4567",
  },
  {
    "questionId": "1236",
    "answer": "Somos um restaurante de comida italiana."
  }
]
```

- **questionId** (string): O ID da questão à qual a resposta está relacionada.
- **alternativeId** (string, opcional): O ID da alternativa selecionada se a pergunta tiver alternativas.
- **answer** (string, opcional): A resposta do usuário se a pergunta não tiver alternativas.
- **alternativeId** e **answer** são opcionais, porém algum deve ser informado obrigatóriamente em cada resposta.


## Caso de sucesso
- ❌ Valida o token de autenticação do usuário.
- ❌ Valida se o ID de cada questão representam uma Question no banco de dados.
- ❌ Valida se a questão que contém alternativas foi preenchida com um ID de alternativa válido.
- ❌ Cria um ID para a resposta.
- ❌ Registra as respostas do usuário no DB.
- ❌ Gera um Input para o GPT a partir das respostas dadas pelo usuário.
- ❌ Chama a API do GPT para criar o Business Canvas enviando o input gerado.
- ❌ Cria um ID para o Business Canvas.
- ❌ Adiciona o Business Canvas no DB.
- ❌ Retorna o Business Canvas gerado pelo Chat GPT.

### Resposta

- ❌ Código de status: **201 Created**
- ❌ Corpo da resposta: O Business Canvas gerado pelo GPT.


Exemplo:
```json
{
  "customerSegments": [
    "Respostas 1."
    "Respostas 2."
  ],
  "valueProposition": [
    "Respostas 1."
    "Respostas 2.",
    "Respostas 3."
  ],
  "revenueStreams": [
    "Respostas 1."
  ],
}
```
- Os *Componentes* (***customerSegments***, ***valueProposition***, ***revenueStreams***) representam algumas das seções do Business Canvas.
- Cada seção contém um array de respostas correspondentes.

## Casos de Exceção

### Respostas

- Código de status: **400 Bad Request**
  - ❌ Se algum campo do corpo da requisição estiver ausente ou for inválido.
  - ❌ Se o client informar mais dados do que os requeridos.
  - ❌ Se o tipo do dado informado não for válido.
- Código de status: **401 Unauthorized**
  - ❌ Se o cabeçalho de autorização estiver ausente ou inválido.
  - ❌ Se o token de autenticação for inválido ou expirado.
  - ❌ Se o usuário não estiver autenticado na plataforma.
- Código de status: **404 Not Found**
  - ❌ Se não encontrar as questões para as respostas.
- Código de status: **500 Internal Server Error**
  - ❌ Em caso de erro interno no servidor.
