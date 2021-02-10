const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        const urlRegex = /(http|https):\/\/?[\w-._~:?#[\]@!$&'()*+,;=]+(?:\.[\w\-._~:?#[\]@!$&'()*+,;=]+)/;
        return urlRegex.test(url);
      },
    },
  },
  likes: [{ type: 'ObjectId', default: '' }],
  createdAt: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
