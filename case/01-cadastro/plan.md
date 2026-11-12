# Plano 01 — Cadastro e listagem

## Endpoints
| Método | Rota | Entrada | Saída | Erros |
|---|---|---|---|---|
| GET | `/participants` | — | `200`: array de `{ name, email }`, na ordem de cadastro | — |
| POST | `/participants` | JSON `{ name, email }` | `201`: participante `{ name, email }` | `400`: dados inválidos; `409`: e-mail já cadastrado |

## Modelo em memória
- `name`: string — nome sem espaços nas pontas.
- `email`: string — e-mail normalizado em minúsculas e sem espaços nas pontas.

## Tela
- Formulário com campos de nome e e-mail e ação para cadastrar.
- Área `#message` apresenta erros de cadastro em português.
- Lista apresenta nome e e-mail dos inscritos, na ordem de cadastro; vazia quando não houver inscritos.

## Decisões técnicas
- Usar o array em memória do servidor para guardar os participantes e preservar a ordem de inserção (R3).
- No cadastro, validar campos obrigatórios e nome com no mínimo 2 caracteres após trim; rejeitar e-mail repetido após normalização (R1, R2).
- Retornar erro HTTP 400 para entrada inválida e 409 para e-mail duplicado (R4).
- Exibir o e-mail normalizado na lista e manter o nome aparado (R2, R3).

## Dúvidas resolvidas
| Dúvida | Decisão |
|---|---|
| Como representar a resposta da listagem? | Array de objetos com `name` e `email`, sem campos adicionais (R3). |
| Como tratar espaços nas pontas do nome? | Removê-los antes de validar e guardar o nome (R1). |
