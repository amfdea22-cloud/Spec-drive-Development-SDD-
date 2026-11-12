// Esqueleto do case "Inscrições da Oficina".
// Os incrementos da spec vão adicionar rotas aqui. Não mude a porta nem a estrutura.
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dados em memória. Um array, nada mais.
let participants = [];

function resetData() {
  participants = [];
}

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/participants', (req, res) => {
  res.json(participants);
});

app.post('/participants', (req, res) => {
  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (name.length < 2 || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
  }

  if (participants.some((participant) => participant.email === email)) {
    return res.status(409).json({ error: 'E-mail já cadastrado' });
  }

  const participant = { name, email };
  participants.push(participant);
  return res.status(201).json(participant);
});

module.exports = { app, resetData };

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Inscrições da Oficina rodando em http://localhost:3000');
  });
}
