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

// Web server

var express = require('express');
var mongoose = require( 'mongoose' );

// local database
//var mongo_uri = 'mongodb://localhost/comphound';

// mongolab hosted
var mongo_uri = 'mongodb://comphound:comphound@ds047612.mongolab.com:47612/comphound';

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
    + 'and visualisation\n' );
});

app.set( 'port', process.env.PORT || 3001 );

var server = app.listen(
  app.get( 'port' ),
  function() {
    console.log( 'CompHound server listening at port '
                + server.address().port ); }
);
