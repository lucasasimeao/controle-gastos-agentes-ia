# Decolagem - Especificação

## O que o App faz
Permite registrar e vizualizar gastos pessoais pelo navegador.

## Interface (FRONTEND)
- Página única com :
  - Formulário campo de descrição, campo de valor, botão de "adicionar" 
  - Lista de gastos cadastrados com descrição e valor em cada linha
  - Total de gastos exibido no rodapé da lista

##  API (BACKEND)
  - GET /expenses --> retornar todas os gastos
  - POST /expenses --> adicionar um novo gasto

## Regras
- Descrição e valor são obrigatorios
- Valor deve ser um número positivo
- Gastos salvos em memória 
- Cada gasto tem: id, descripition, amount,