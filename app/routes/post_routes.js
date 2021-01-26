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

// CREATE post
// POST /posts
router.post('/posts', requireToken, (req, res, next) => {
  const postData = req.body.post
  postData.owner = req.user._id
  Post.create(postData)
  // might need toObject method inside curlies
    .then(post => res.status(201).json({ post: post }))
    .catch(next)
})

module.exports = router
