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

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  req.user = user;
  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  const index = req.params.index;
  return res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
  const { nome } = req.body;

  users.push(nome);
  return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const {
    body: { nome },
    params: { index }
  } = req;

  users[index] = nome;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
