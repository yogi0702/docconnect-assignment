const mongoose = require('mongoose')

const connectionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
})

// One request per direction. Lets the DB reject duplicates instead of trusting the client.
connectionSchema.index({ from: 1, to: 1 }, { unique: true })

module.exports = mongoose.model('Connection', connectionSchema)
