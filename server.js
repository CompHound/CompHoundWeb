// server.js
//
// main entry point for the CompHoundWeb cloud-based
// universal component and asset usage analysis,
// report and visualisation application, implemented
// as a node.js REST API driven web server with a
// mongo database and Autodesk View and Data API
// viewer.
//
// Copyright 2015 by Jeremy Tammik, Autodesk Inc.

var pkg = require( './package.json' );

// Mongo database stuff

var mongoose = require( 'mongoose' );

var localMongo = false; // local or remote, i.e. mongolab hosted

var mongo_uri = localMongo
  ? 'mongodb://localhost/comphound'
  : 'mongodb://comphound:comphound@ds047612.mongolab.com:47612/comphound';

mongoose.connect( mongo_uri );
var db = mongoose.connection;
db.on( 'error', function () {
  var msg = 'unable to connect to database at ';
  throw new Error( msg + mongo_uri );
});

// Middleware

var express = require('express');
var app = express();

app.set( 'port', process.env.PORT || 3001 );

var bodyParser = require( 'body-parser' );
app.use( bodyParser.json({ limit: '1mb' }) );
app.use( bodyParser.urlencoded({ extended: true, limit: '1mb' }) );

// REST API to populate mongo database

require( './model/instance' );
require( './routes' )( app );

// Public HTML client stuff

app.get( '/version', function( request, response ) {
  response.send( 'CompHound cloud-based universal '
    + 'component and asset usage analysis, report '
    + 'and visualisation ' + pkg.version + '.\n' );
});

// Just for fun, echo a message, if provided

app.get('/hello/:message', function (req, res) {
  res.send('CompHound: Hello! You sent me <b>'
           + req.params.message + '</b>');
})

//var handlebars = require('express-handlebars');
//app.engine('handlebars', handlebars());
//app.set('view engine', 'handlebars');
//app.use(express.static(__dirname + '/public'));
//app.set( 'views', __dirname + '/views' );

var hb = require('handlebars');

var template_filename = __dirname
  + '/view/instances.handlebars';

var instance_template = null;

fs = require('fs');

fs.readFile( template_filename, 'utf8',
  function (err,data) {
    if (err) {
      return console.log(err);
    }
    //console.log(data);

    console.log( 'Read template file '
                + template_filename );

    instance_template = hb.compile(data);
  }
);

app.get( '/html/count', function(req, res) {
  Instance = mongoose.model('Instance');
  Instance.find({},function(err, results) {
    var htmltemp = '<h1>{{count}} Instances</h1>';
    var template = hb.compile(htmltemp);
    var n = results.length;
    var context = {count: n};
    var html = template(context);
    return res.send(html);
  });
});

app.get( '/www/instances', function(req, res) {
  console.log('Accessing database instances...');
  Instance = mongoose.model('Instance');
  Instance.find({},function(err, results) {
    var n = results.length;
    console.log('Rendering ' + n.toString()
                + ' database instances...');
    var context = {count: n, instances:results};
    var html = instance_template(context);
    return res.send(html);
  });
});

var server = app.listen(
  app.get( 'port' ),
  function() {
    console.log( 'CompHound server ' + pkg.version
                + ' listening at port '
                + server.address().port + ' with '
                + (localMongo?'locally ':'mongolab-')
                + 'hosted mongo db.'); }
);
