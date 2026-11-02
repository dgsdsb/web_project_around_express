const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID de usuário inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Usuário não encontrado' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Dados inválidos para criação do usuário' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Dados inválidos para atualização do perfil' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Usuário não encontrado' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID de usuário inválido' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Dados inválidos para atualização do avatar' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Usuário não encontrado' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID de usuário inválido' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro no servidor' });
    });
};
