// Initialize express
const express = require('express')
const app = express()
const path = require('path')
// require handlebars
const exphbs = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, "/views/layouts"),
  defaultLayout: 'main'
});

// Database
const database = require('./data/reddit-db')

// Middleware
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

// Constrollers
const posts = require('./controllers/posts.js')

// Models
const Post = require('./models/post')

// Use "main" as our default layout
app.engine('handlebars', exphbs.engine);
// Use handlebars to render
app.set('view engine', 'handlebars');

// Middleware initialization, Use Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())


// Access controllers & database
app.use(posts)

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;

