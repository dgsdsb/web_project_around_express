const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');

// GET /cards
router.get('/', (req, res) => {
  fs.readFile(cardsPath, 'utf8')
    .then((data) => {
      const cards = JSON.parse(data);
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ocorreu um erro no servidor' });
    });
});

module.exports = router;
