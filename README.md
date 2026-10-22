# Controle de Gastos com Agentes de IA

> App web de registro de gastos construído com um fluxo de **agentes de IA especializados** (back-end, front-end e orquestrador) guiados por uma especificação única.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-prompt%20files-000000?logo=githubcopilot&logoColor=white)

## Sobre o projeto

O foco deste projeto não é a complexidade do app, e sim **o processo de desenvolvimento com IA**. Em vez de pedir tudo para um único assistente, o trabalho foi dividido entre agentes com responsabilidades e limites claros:

| Agente | Arquivo | Pode mexer em | Papel |
| --- | --- | --- | --- |
| Back-end | `.github/prompts/backend.prompt.md` | só `src/` | Cria e mantém a API |
| Front-end | `.github/prompts/frontend.prompt.md` | só `public/` | Cria a interface (HTML, CSS e JS puro com `fetch`) |
| Orquestrador | `.github/prompts/orchestrator.prompt.md` | os dois | Confere se front e back conversam (rotas e campos) e corrige |

Todos leem primeiro o [`SPEC.md`](decolagem/SPEC.md), que funciona como contrato do projeto. O resultado é um app simples de controle de gastos pessoais, com API, interface e teste de integração.

Exercício da graduação em IA e Automação Digital (UniFECAF), no tema de IA generativa aplicada ao desenvolvimento.

## Funcionalidades

- Cadastro de gastos com descrição e valor.
- Lista de gastos com valores em reais e **total** no rodapé.
- Validação no servidor: descrição obrigatória e valor numérico positivo (respostas `400` com mensagem).
- Rota `/health` para verificar se o servidor está no ar.
- Arquivo `request.http` com requisições de exemplo (casos válidos e inválidos).
- Teste de integração que sobe o servidor e testa `GET /`, `GET /expenses` e `POST /expenses`.

> Os gastos ficam **em memória**, como definido na especificação: são apagados ao reiniciar o servidor.

## Tecnologias

- Node.js, Express 5
- HTML, CSS e JavaScript puro (sem frameworks)
- Testes com `assert` e `http` nativos do Node
- GitHub Copilot com *prompt files* (`.github/prompts/`)

## Como executar

```bash
git clone https://github.com/lucasasimeao/controle-gastos-agentes-ia.git
cd controle-gastos-agentes-ia/decolagem
npm install
npm start      # http://localhost:3000
npm test       # teste de integração
```

### API

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/expenses` | Lista os gastos |
| POST | `/expenses` | Cria um gasto: `{ "description": "Almoço", "amount": 25.5 }` |
| GET | `/health` | Status do servidor |

## Estrutura do projeto

```text
decolagem/
├── .github/prompts/     # Prompts dos três agentes
├── SPEC.md              # Especificação (contrato entre os agentes)
├── public/index.html    # Interface
├── src/app.js           # Configuração do Express
├── src/routes/expenses.js
├── src/server.js
├── test/app.test.js
└── request.http
```

## Competências demonstradas

- **Engenharia de prompt aplicada a agentes**: papéis, escopo de arquivos e ordem de trabalho definidos por escrito.
- **Orquestração multiagente** com um agente revisor que valida a integração.
- **Desenvolvimento orientado a especificação** (spec-driven development).
- **API REST com validação** e teste de integração automatizado.

## Próximos passos

- Persistir os gastos (SQLite ou JSON) e adicionar categorias.
- Gerar um resumo por categoria e por mês (base para análise de dados dos gastos).
