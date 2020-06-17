// Initialize express
const express = require('express')
const app = express()
const path = require('path')

//get data back from db 
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

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

// Constrollers
const posts = require('./controllers/posts.js')
const comments = require('./controllers/comments.js')

// Models
const Post = require('./models/post')
const Comment = require('./models/comment')

// Use "main" as our default layout
// app.engine('handlebars', exphbs.engine);
// Use handlebars to render
// app.set('view engine', 'handlebars');

// Middleware initialization, Use Body Parser
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(expressValidator())

// Use "main" as our default layout
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.engine('handlebars', hbs.engine);

// Use handlebars to render
app.set('view engine', 'handlebars');

// override with POST having ?_method=DELETE or ?_method=PUT
// app.use(methodOverride('_method'))

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Access controllers & database
app.use(posts)
app.use(comments)

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;

