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

// Ensure that the View and Data API consumer
// key and secret environment variables are set.

if( !process.env.COMPHOUND_CONSUMERKEY
  || !process.env.COMPHOUND_CONSUMERSECRET ) {
  var msg = 'Please set the CompHound View and Data API '
    + 'consumer key and secret environment variables '
    + 'COMPHOUND_CONSUMERKEY and COMPHOUND_CONSUMERSECRET '
    + 'before starting the server.';
  console.log( msg );
  throw new Error( msg );
}

//console.log(
//  'CompHound View and Data API consumer key and secret: '
//  + process.env.COMPHOUND_CONSUMERKEY + ' '
//  + process.env.COMPHOUND_CONSUMERSECRET );

// Read configuration settings.

var pkg = require( './package.json' );
var config = require('./config/config.json');

// Set up Mongo database.

var mongoose = require('mongoose');

if( config.db.local ) {
  var mongo_uri = 'mongodb://localhost/'
    + config.db.database;
  mongoose.connect( mongo_uri );
}
else {
  mongoose.connect(
    config.db.host || 'localhost',
    config.db.database,
    config.db.port || 27017,
    { user: config.db.username,
      pass: config.db.password }
  );
}

var DataTable = require('mongoose-datatable');
//DataTable.configure( { debug: true, verbose: true } );
mongoose.plugin( DataTable.init );

var db = mongoose.connection;

// Database connection error handler

db.on( 'error', function () {
  var msg = 'unable to connect to database at ';
  console.log( msg );
  throw new Error( msg + db.host );
});

// Database connection success handler

db.once( 'open', function() {

  console.log( 'Connection to ' + db.name
    + ' database at ' + db.host
    + ' established.' );

  // Set up web serveer middleware.

  var path = require('path');
  var express = require('express');
  var app = express();

  app.set( 'port', process.env.PORT || config.port || 3001 );

  //app.use( express.favicon() );

  //app.set( 'views', path.join( __dirname, './views' ) );
  //app.set( 'view engine', 'jade' );

  app.use( express.static( path.join( __dirname, './public' ) ) );

  var bodyParser = require( 'body-parser' );
  app.use( bodyParser.json({ limit: '1mb' }) );
  app.use( bodyParser.urlencoded({ extended: true, limit: '1mb' }) );

  // Define REST API to populate mongo database.

  model = require( './model/instance' );
  require( './routes' )( app );

  // Public HTML client access points.

  app.get( '/', function( request, response ) {
    response.send( 'CompHound cloud-based universal '
      + 'component and asset usage analysis, report '
      + 'and visualisation ' + pkg.version + '.\n' );
  });

  // Just for fun, echo a message, if provided.

  app.get('/hello/:message', function (req, res) {
    res.send('CompHound: Hello! You sent me <b>'
             + req.params.message + '</b>');
  })

  // Custom handlebars rendering
  // http://webapplog.com/jade-handlebars-express/
  var hb =require ('express-handlebars') ;
  app.engine ('handlebars', hb ({
	  //defaultLayout: 'instances1',
	  'layoutsDir': (__dirname + '/view')
  })) ;
  app.set ('view engine', 'handlebars') ;
  app.set ('views', __dirname + '/view') ;

  app.get ('/html/count', function (req, res) {
    Instance =mongoose.model ('Instance') ;
    Instance.find ({},function (err, results) {
      res.render ('count', { count: results.length }) ;
    }) ;
  }) ;

  app.get ('/www/instances1', function(req, res) {
    console.log ('Accessing database instances 1...') ;
    Instance =mongoose.model ('Instance') ;
    Instance.find ({},function (err, results) {
      res.render ('instances1', { count: results.length, instances: results }) ;
    }) ;
  }) ;

  app.get('/datatable2', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/datatable2.html'));
  });
  app.get('/www/data', function(req, res, next) {
    var options = { select: "bool" };
    model.dataTable( req.query, options, function(err, data) {
      //if (err) return next(err);
      if (err) return res.send(err);
      res.send(data);
    });
  });

  // Catch 404 and forward to error handler.
  app.use (function (req, res, next) {
    var err =new Error ('Error 404 - Resource Not Found') ;
    err.status =404 ;
    next (err) ;
  }) ;

  // Error handlers
  // development error handler, will print stacktrace
  if ( app.get ('env') === 'development') {
    app.use (function (err, req, res, next) {
      res.status (err.status || 500) ;
      res.render ('error', {
        message: err.message,
        error: err
      }) ;
    }) ;
  }

  // production error handler, no stacktraces leaked to user
  app.use (function (err, req, res, next) {
    res.status (err.status || 500) ;
    res.render ('error', {
      message: err.message,
      error: {}
    }) ;
  }) ;

  var server = app.listen(
    app.get( 'port' ),
    function() {
      var h = db.host;
      if( -1 < h.indexOf('localhost') ) { h = 'locally '; }
      else if( -1 < h.indexOf('mongolab') ) { h = 'mongolab-'; }

      console.log( 'CompHound server ' + pkg.version
        + ' listening at port ' + server.address().port
        + ' with ' + h + 'hosted mongo db.');
    }
  );

});
