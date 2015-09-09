// instance.js
//
// mongo data model definition for a component occurence aka instance.
//
// Copyright 2015 by Jeremy Tammik, Autodesk Inc.

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UniqueId = String; // we have our own unique identifier

var instanceSchema = new Schema(
  { _id          : UniqueId // suppress automatic generation
    , project    : String
    , family     : String
    , symbol     : String
    , level      : String
    , properties : String // json dictionary of instance properties and values
    , x          : Number
    , y          : Number
    , z          : Number
    , easting    : Number // Geo2d?
    , northing   : Number
  },
  { _id: false } // suppress automatic generation
);

mongoose.model( 'Instance', instanceSchema );
