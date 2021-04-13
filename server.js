// Library requirements
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//app setup
const app = express()
const port = 3000
app.use(express.json());


//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=> {
    res.render("home")
})

//Server start
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})