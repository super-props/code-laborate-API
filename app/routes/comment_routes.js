const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')
const handle404 = errors.handle404
const requireOwnership = errors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const Post = require('../models/post')

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

<<<<<<<
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

// UPDATE comment
// PATCH /posts/:commentId

router.patch('/posts/:commentId', requireToken, (req, res, next) => {
  // extract commentID
  const commentId = req.params.commentId

  // extract comment data
  const commentData = req.body.comment

  // extract Post Id
  const postId = req.body.comment.postId

  delete req.body.post.owner
  delete req.body.comment.owner

  Post.findById(postId)
    .then(handle404)
    .then(post => {
      const comment = post.comment.id(commentId)

      comment.set(commentData)
      return post.save()
    })
    .then(post => res.status(201).json({ post: post }))
>>>>>>>
    .catch(next)
})

// DELETE comment
// DELETE /posts/:commentId

router.delete('/posts/:commentId', requireToken, (req, res, next) => {
  const commentId = req.params.commentId
  // extract the restaurant Id from req data
  const postID = req.body.review.postID

  Post.findById(postID)
    .then(handle404)
    .then(post => {
      post.comment.id(commentId).remove()

      return post.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
