# Tarefas 01 — Cadastro e listagem

- [x] **T1** (R3) Implementar `GET /participants` retornando array de participantes em ordem de cadastro — verificar: requisição inicial retorna `200` e array vazio.
- [x] **T2** (R1, R4) Implementar validação do nome e e-mail obrigatórios e nome com pelo menos 2 caracteres após trim — verificar: entradas inválidas retornam `400` com a mensagem especificada e não alteram a lista.
- [x] **T3** (R2, R4) Normalizar e-mail e impedir cadastro duplicado ignorando caixa e espaços nas pontas — verificar: repetição retorna `409` com “E-mail já cadastrado” e não altera a lista.
- [x] **T4** (R1, R2) Implementar `POST /participants` para cadastrar participante válido e guardar nome aparado e e-mail normalizado — verificar: resposta `201` e participante armazenado com esses valores.
- [x] **T5** (R3) Criar na tela o formulário para enviar nome e e-mail a `/participants` e a lista com nome e e-mail dos inscritos — verificar: cadastro válido aparece na lista.
- [x] **T6** (R3) Carregar e apresentar a lista na ordem de cadastro, inclusive quando vazia — verificar: `GET /participants` inicializa lista vazia e Ana aparece antes de Bia após cadastros nessa ordem.
- [x] **T7** (R4) Apresentar em `#message` os erros da API sem atualizar a lista — verificar: cadastro inválido e e-mail duplicado exibem a mensagem de erro e mantêm a lista inalterada.
- [x] **T8** (R1, R2, R3, R4) Rodar todos os cenários de aceite — verificar: C1 a C6 passam; no P5, `npm test` termina com `fail 0`.
