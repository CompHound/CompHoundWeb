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
var express = require('express');
var mongoose = require( 'mongoose' );

var localMongo = false;

if(localMongo) {
  // local database
  var mongo_uri = 'mongodb://localhost/comphound';
} else {
  // mongolab hosted
  var mongo_uri = 'mongodb://comphound:comphound@ds047612.mongolab.com:47612/comphound';
}

mongoose.connect( mongo_uri );
var db = mongoose.connection;
db.on( 'error', function () {
  var msg = 'unable to connect to database at ';
  throw new Error( msg + mongo_uri );
});

var app = express();

var bodyParser = require( 'body-parser' );
app.use( bodyParser.json({ limit: '1mb' }) );
app.use( bodyParser.urlencoded({ extended: true, limit: '1mb' }) );

require( './model/instance' );
require( './routes' )( app );

app.get( '/', function( request, response ) {
  response.send( 'CompHound cloud-based universal '
    + 'component and asset usage analysis, report '
    + 'and visualisation ' + pkg.version + '.\n' );
});

app.get( '/', function( request, response ) {
  response.send( 'CompHound cloud-based universal '
    + 'component and asset usage analysis, report '
    + 'and visualisation ' + pkg.version + '.\n' );
});

app.get('/:message', function (req, res) {
  res.send('CompHound: You sent me <b>' + req.params.message + '</b>');
})

app.set( 'port', process.env.PORT || 3001 );

var server = app.listen(
  app.get( 'port' ),
  function() {
    console.log( 'CompHound server ' + pkg.version
                + ' listening at port '
                + server.address().port + ' with '
                + (localMongo?'locally ':'mongolab-')
                + 'hosted mongo db.'); }
);
