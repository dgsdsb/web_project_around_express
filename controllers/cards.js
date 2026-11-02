const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Dados inválidos para criação do cartão' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID de cartão inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Cartão não encontrado' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID de cartão inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Cartão não encontrado' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID de cartão inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Cartão não encontrado' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};
