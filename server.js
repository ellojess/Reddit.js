// Initialize express
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// require handlebars
const exphbs = require('express-handlebars');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Use Body Parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
// app.use(expressValidator());

// controllers 
require('./controllers/posts.js')(app);
// Set db
require('./data/reddit-db');

// Render the "home" layout for the main page and send the following msg
app.get('/', (_, res) => {
    res.render('layouts/main', {});
});

// NEW
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

