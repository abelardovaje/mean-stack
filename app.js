
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var routes = require('./modules/routes.js');
var cookieParser = require('cookie-parser');
var app = express();
var server = http.createServer(app);
app.use("/public", express.static(__dirname + '/public'));
app.use('/',express.static(__dirname+'/resources/views'));

//MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
	secret:process.env.SESSION_SECRET || 'secret',
	resave: false,saveUninitialized: true,
	// cookie: 
	// 	{ secure: false,
	// 		"maxAge": 86400000 
	// 	},
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
	load all models
*/

app.models = require('./modules/models/index');

/*
	load all routes
*/
routes.load(app);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('connected to db');
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');


app.set('server',server);
app.get('server').listen(9000,function(){
	console.log('listening to port 9000');
});










































