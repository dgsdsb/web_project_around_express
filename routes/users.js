const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

// GET /users
router.get('/', (req, res) => {
  fs.readFile(usersPath, 'utf8')
    .then((data) => {
      const users = JSON.parse(data);
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ocorreu um erro no servidor' });
    });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(usersPath, 'utf8')
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item._id === id);

      if (!user) {
        return res.status(404).send({ message: 'ID do usuário não encontrado' });
      }

      return res.send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ocorreu um erro no servidor' });
    });
});

module.exports = router;
