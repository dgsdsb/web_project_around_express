const mongoose = require('mongoose');

const urlRegex = /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)+[\w\-._~:/?%#[\]@!$&'()*+,;=]*#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegex.test(value),
      message: 'URL de avatar inválida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
