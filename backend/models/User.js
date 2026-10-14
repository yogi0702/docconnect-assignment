const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  profileImage: { type: String, required: true },
  connectionsCount: { type: Number, default: 0 },
})

module.exports = mongoose.model('User', userSchema)
