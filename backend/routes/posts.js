const router = require('express').Router()
const Post = require('../models/Post')

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name occupation profileImage')
      .sort({ timestamp: -1 })

    res.json(posts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
