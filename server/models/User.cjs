// server/models/User.cjs
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller','customer', 'guest'], default: 'guest' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
