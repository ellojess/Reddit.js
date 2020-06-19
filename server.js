// Initialize express
const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config();

// get data back from db 
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

// Database
const database = require('./data/reddit-db')

// Middleware
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Controllers
const posts = require('./controllers/posts.js')
const comments = require('./controllers/comments.js')
const auth = require('./controllers/auth.js')

app.engine('handlebars', hbs.engine);

// Use handlebars to render
app.set('view engine', 'handlebars');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Access controllers & database
app.use(posts)
app.use(comments)
app.use(auth)

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;

