const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')
const handle404 = errors.handle404
const requireOwnership = errors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const Post = require('../models/post')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE comment
// POST /comments
router.post('/comments', requireToken, (req, res, next) => {
  const commentData = req.body.comment
  commentData.owner = req.user._id
  const postId = commentData.postId
  Post.findById(postId)
    .populate('comments', 'owner content')
    .then(handle404)
    .then(post => {
      post.comments.push(commentData)
      return post.save()
    })
    .then(post => res.status(201).json({ post }))
    .catch(next)
})

module.exports = router
