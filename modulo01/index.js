const express = require('express');
const server = express();

server.use(express.json());

const users = ['Wallace', 'Aline', 'Jana'];

server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: 'User name is required' });
  }
  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) => {
  const index = req.params.id;
  return res.json(users[index]);
});

server.post('/users', checkUserExists, (req, res) => {
  const { nome } = req.body;

  users.push(nome);
  return res.json(users);
});

server.put('/users/:index', checkUserExists, (req, res) => {
  const {
    body: { nome },
    params: { index }
  } = req;

  users[index] = nome;

  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
