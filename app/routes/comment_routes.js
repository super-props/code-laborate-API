const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')
const handle404 = errors.handle404
// const requireOwnership = errors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')

const Post = require('../models/post')

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE comment
// POST /comments
router.post('/comments', requireToken, (req, res, next) => {
  const commentData = req.body.comment
  commentData.owner = req.user
  const postId = commentData.postId
  Post.findById(postId)
    .populate('owner', '_id email')
    // .populate('comments', 'owner content')
    .then(handle404)
    .then(post => {
      post.comments.push(commentData)
      return post.save()
    })
    .then(post => {
      const lastCommentPosition = (post.comments.length - 1)
      const newComment = post.comments[lastCommentPosition]
      return newComment
    })
    .then((newComment) => res.status(201).json({ newComment }))
})

// UPDATE comment
// PATCH /comments/:commentId

router.patch('/comments/:commentId', requireToken, (req, res, next) => {
  // extract commentID
  const commentId = req.params.commentId

  // extract comment data
  const commentData = req.body.comment

  // extract Post Id
  const postId = req.body.comment.postId

  // delete req.body.comment.owner

  Post.findById(postId)
    .populate('owner', '_id email')
    .then(handle404)
    .then(post => {
      // requireOwnership(req, post.comment)
      const comment = post.comments.id(commentId)

      comment.set(commentData)
      return post.save()
    })
    .then(post => {
      const lastCommentPosition = (post.comments.length - 1)
      const updatedComment = post.comments[lastCommentPosition]
      return updatedComment
    })
    .then((updatedComment) => res.status(201).json({ updatedComment }))
})
//     .then(post => res.status(201).json({ post: post }))
//     .catch(next)
// })

// DELETE comment
// DELETE /comments/:commentId

router.delete('/comments/:commentId', requireToken, (req, res, next) => {
  const commentId = req.params.commentId

  // const commentData = req.body.comment

  // extract post id
  const postId = req.body.comment.postId

  Post.findById(postId)
    .then(handle404)
    .then(post => {
      // requireOwnership(req, post)
      const comment = post.comments.id(commentId)

      comment.remove()

      return post.save()
    })
    .then(post => res.status(201).json({ post: post }))
    .catch(next)
})

module.exports = router
