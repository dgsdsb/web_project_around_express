const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Middleware 404
app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});

module.exports = app;
