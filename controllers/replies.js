const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const app = require('express')()

//New Reply
app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    var currentUser = req.user

    Post.findById(req.params.postId)
        .then(p => {
            post = p
            return Comment.findById(req.params.commentId)
        })
        .then(comment => {
            res.render('replies-new', { post, comment, currentUser})
        })
        .catch(err => {
            console.log(err.message);
        })

})

// Create Reply
app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
    // Turn Reply into a comment object 
    const reply = new Comment(req.body)
    reply.author = req.user._id
    // Look up parent post 
    Post.findById(req.params.postId)
        .then(post => {
            // Find the child comment 
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId) 
            ])
            .then(([reply, comment]) => {
                // ADD THE REPLY
                comment.comments.unshift(reply._id)

                return Promise.all([
                    comment.save()
                ])
            })
            .then(() => {
                res.redirect(`/posts/${req.params.postId}`)
            })
            .catch(console.error)
            // SAVE THE CHANGE TO PARENT DOCUMENT
            return post.save()
        })
})

module.exports = app 