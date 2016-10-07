
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var routes = require('./modules/routes.js');
var cookieParser = require('cookie-parser');
var app = express();
var csrf = require('csurf')
var server = http.createServer(app);
var csrfProtection = csrf({ cookie: true })
app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use('/',express.static(__dirname+'/resources/views'));
var jwt = require('jsonwebtoken');
var helmet = require('helmet');

//MIDDLEWARE
app.use(cookieParser());
app.use(csrf({ cookie: true }))
app.use(helmet());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
	secret:process.env.SESSION_SECRET || 'secret',
	resave: false,saveUninitialized: true,
	// cookie: {httpOnly: true, secure: true},
	// store: new (require('express-sessions'))({
 //        storage: 'mongodb',
 //        instance: mongoose, // optional 
 //        host: 'localhost', // optional 
 //        port: 9000, // optional 
 //        db: 'test', // optional 
 //        collection: 'sessions', // optional 
 //        expire: 86400 // optional 
 //    })	 
	}));


/*
	We use csurf for csrfProtection
*/
app.use(function(req, res, next) {

    res.cookie('XSRF-TOKEN',req.csrfToken());
    next();

});

// error handler
app.use(function (err, req, res, next) {

  // if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // // handle CSRF token errors here
  // res.status(403);
  // res.send('Invalid token');
  next();
})


/*
	Passport
*/

require('./modules/config/passport')(app);

/*
	load all routes
*/
routes.load(app);


/*
	Database
*/

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('connected to db');
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chat');


/*
	Start server
*/
app.set('server',server);
app.get('server').listen(9000,function(){
	console.log('listening to port 9000');
});










































