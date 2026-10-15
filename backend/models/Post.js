const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  content: { type: String, required: true, trim: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // several images render as a carousel
  images: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', postSchema)
