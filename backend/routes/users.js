const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const Connection = require('../models/Connection')

router.get('/', async (req, res, next) => {
  try {
    const { currentUserId } = req.query
    const hasCurrentUser = mongoose.isValidObjectId(currentUserId)

    const users = await User.find(
      hasCurrentUser ? { _id: { $ne: currentUserId } } : {}
    ).lean()

    let requestedIds = new Set()
    if (hasCurrentUser) {
      const connections = await Connection.find({ from: currentUserId })
        .select('to')
        .lean()
      requestedIds = new Set(connections.map((c) => String(c.to)))
    }

    res.json(
      users.map((user) => ({
        ...user,
        requested: requestedIds.has(String(user._id)),
      }))
    )
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user id' })
    }

    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
