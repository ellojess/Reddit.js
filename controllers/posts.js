const Post = require('../models/post');

module.exports = app => {
    // CREATE
    app.post("/posts/new", (req, res) => {
      console.log(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
        // REDIRECT TO THE ROOT
        return res.redirect(`/`);
      })
    });

  };

