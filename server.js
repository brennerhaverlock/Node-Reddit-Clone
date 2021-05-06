// Library requirements
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');



//app setup
const app = express()
const port = 3000

app.use(cookieParser()); // Add this after you initialize express.

// Use Body Parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next();
  };
  app.use(checkAuth);


require('./controllers/posts.js')(app);
require('./data/reddit-db')
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);



// app.get('/posts/new', (req, res) => {
//     res.render('posts-new')
// })

module.exports = app;

//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})