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
    , path       : String
    , urn        : String
    , family     : String
    , symbol     : String
    , category   : String
    , level      : String
    , x          : Number
    , y          : Number
    , z          : Number
    , easting    : Number // Geo2d?
    , northing   : Number
    //, altitude   : Number
    , properties : String // json dictionary of instance properties and values
  },
  { _id: false } // suppress automatic generation
);

module.exports = mongoose.model( 'Instance', instanceSchema );
