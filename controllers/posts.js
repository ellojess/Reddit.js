const app = require('express')()
const Post =  require('../models/post')


// Post index
app.get("/", (req, res) => {
    var currentUser = req.user;
  
    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

// NEW
app.get('/posts/new', (req, res) => {
    console.log("in posts-new")
    return res.render('posts-new', {});
  })


// CREATE
app.post("/posts/new", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);
  
      post.save(function(err, post) {
        return res.redirect(`/`);
      });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

// SHOW
app.get('/posts/:id', (req, res) => {
    // Look up the post
    Post.findById(req.params.id)
    .populate('comments')
    .then(post => {
        res.render('posts-show', { post })
    })
    .catch(err => {
        console.log(err.message);
    })
})

// SUBREDDIT
app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
        res.render("posts-index", { posts });
        })
        .catch(err => {
        console.log(err);
        });
    });

module.exports = app  