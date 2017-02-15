//get all the tools we need
var express = require("express");
var app = express();
var exphbs  = require('express3-handlebars');
var path = require('path');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser'); 
var morgan = require('morgan'); 
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash    = require('connect-flash');



// required for passport
app.use(session({ secret: 'nodeloginapi' ,resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);

// get an instance of express router
var router = express.Router();
require("./routes/main.js")(app,router,passport);


// APP CONFIGURATION 
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
		Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));


// Static Routing for js,css and image files
app.use(express.static(__dirname + '/public'));

//set express3-handlebars view engine
app.engine('.hbs', exphbs({defaultLayout: 'main' , extname: '.hbs'}));
app.set('view engine', '.hbs');



var server = app.listen(port,function(){
	console.log("We have started our server on port " + port);
});