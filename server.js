var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// install and require the mongoose library
var mongoose = require('mongoose');
// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webdevelopment';
var connectionStringProject = 'mongodb://127.0.0.1:27017/webdevProject';

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.use(express.session({ secret: process.env.PASSPORT_SECRET }));


//app.use(passport.initialize());
//app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.use(cookieParser())
app.use(session({
    secret: 'meanstackisthebest',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
    connectionStringProject = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
//var db = mongoose.connect(connectionString);
var dbProject = mongoose.connect(connectionStringProject);

app.get('/hello', function (req, res) {
    res.send('hello world');
});
app.get('/', function (req, res) {
    res.redirect('/public');
});

require('./public/project/server/app.js')(app, dbProject, mongoose);
//require('./public/assignment/server/app.js')(app, db, mongoose);

app.listen(port, ipaddress);

