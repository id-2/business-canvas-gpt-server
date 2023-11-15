import type { TemplateInputModel } from '@/domain/models/output-models'

export class TemplateForInputWithLocation {
  static create (): TemplateInputModel {
    const input = this.createInputModel()
    return { input }
  }

  private static createInputModel (): string {
    return `Crie um Business Canvas detalhado para o meu empreendimento. O empreendimento é de tipo físico (presencial), local da operação ou público-alvo é {{location}}. A descrição do negócio é a seguinte: {{description}}
Certifique-se de abordar os nove componentes do Business Canvas com ênfase nas particularidades do tipo de negócio e da localização geográfica. Seja criativo e detalhado criando tópicos específicos para cada componente do Business Canvas. Lembre-se de que, dependendo do contexto do negócio, da complexidade ou de qualquer detalhe adicional que você considere necessário, você pode adicionar até 5 tópicos para cada componente.
Crie também um nome para o Business Canvas utilizando como base o tipo do negócio, local ou público-alvo e sua descrição.

Os componentes a serem abordados são:

1. **Proposta de Valor:**
   - Descrever a proposta de valor exclusiva do seu negócio.
   - Resolver problemas ou necessidades dos clientes com sua proposta.
   - (Adicionar até 5 tópicos, se necessário)

2. **Segmentos de Clientes:**
   - Identificar os clientes-alvo, listar detalhes demográficos, comportamentais e geográficos.
   - Justificar a segmentação de mercado.
   - (Adicionar até 5 tópicos, se necessário)

3. **Canais de Distribuição:**
   - Definir como alcançar e interagir com os clientes.
   - Especificar canais de distribuição relacionados à localização geográfica.
   - (Adicionar até 5 tópicos, se necessário)

4. **Relacionamento com o Cliente:**
   - Construir e manter relacionamentos com os clientes.
   - Estabelecer estratégias de atendimento ao cliente e engajamento.
   - (Adicionar até 5 tópicos, se necessário)

5. **Fontes de Receita:**
   - Identificar as principais fontes de receita.
   - Estabelecer preços, estratégias de monetização e modelos de receita.
   - (Adicionar até 5 tópicos, se necessário)

6. **Recursos Chave:**
   - Listar recursos fundamentais necessários para operar o negócio com sucesso.
   - Especificar recursos relacionados à localização geográfica.
   - (Adicionar até 5 tópicos, se necessário)

7. **Atividades Chave:**
   - Enumerar as principais atividades a serem realizadas para atender aos clientes e gerar receita.
   - Detalhar atividades-chave específicas para o tipo de negócio.
   - (Adicionar até 5 tópicos, se necessário)

8. **Parcerias Chave:**
   - Descrever parcerias estratégicas a serem estabelecidas.
   - Identificar parcerias relevantes para a localização geográfica.
   - (Adicionar até 5 tópicos, se necessário)

9. **Estrutura de Custos:**
   - Apresentar detalhes sobre os custos envolvidos na operação do negócio.
   - Especificar custos relacionados à localização geográfica.
   - (Adicionar até 5 tópicos, se necessário)

Retorne um objeto JSON com informações detalhadas para cada um desses componentes, incluindo os tópicos adicionais, se aplicável. Separe os objetos desta forma:

As chaves do JSON devem ser:
“name”, “customerSegments”, “valuePropositions“, “channels“, “customerRelationships“, “revenueStreams“, “keyResources“, “keyActivities“, “keyPartnerships“, “costStructure“

{
“name”: “Nome baseado no tipo do negócio, localização e sua descrição”, 
  " valueProposition": [
    "descrição detalhada da proposta de valor",
    "resolver problemas ou necessidades dos clientes",
    ...
  ],
  "customerSegments": [
    "identificar os clientes-alvo",
    "justificar a segmentação de mercado",
    ...
  ],
  ...
}

Todas as informações devem estar no infinitivo, não conjugar verbos na primeira pessoa.
As informações e o nome do Business Canvas deve estar em pt-br apenas as chaves dos objetos devem estar em inglês.
Não inclua nenhum texto adicional além do Business Canvas em JSON. Nada além do JSON. Nenhum texto além do Business Canvas em JSON.
`
  }
}
