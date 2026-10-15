const router = require('express').Router()
const mongoose = require('mongoose')
const Connection = require('../models/Connection')

router.post('/', async (req, res, next) => {
  try {
    const { from, to } = req.body

    if (!from || !to) {
      return res.status(400).json({ message: 'from and to are required' })
    }
    if (!mongoose.isValidObjectId(from) || !mongoose.isValidObjectId(to)) {
      return res.status(400).json({ message: 'Invalid user id' })
    }
    if (from === to) {
      return res.status(400).json({ message: 'Cannot connect to yourself' })
    }

    const connection = await Connection.create({ from, to })
    res.status(201).json(connection)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ message: 'Already requested' })
    }
    next(err)
  }
})

module.exports = router
