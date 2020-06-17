const app = require('express')()
const Post = require('../models/post')
const Comment = require('../models/comment')

// Create comment
app.post('/posts/:postId/comments', function (req, res) {
    // Instantiate instance of model
    const comment  = new Comment(req.body)

    // Save instance of Comment model to DB
    comment
    .save()
    .then(comment => {
        // Redirect to the Root
        return Post.findById(req.params.postId)
    })
    .then(post => {
        post.comments.unshift(comment)
        return post.save()
    })
    .then(post => {
        res.redirect(`/`)
    })
    .catch(err => {
        console.log(err);
    })
})


module.exports = app  