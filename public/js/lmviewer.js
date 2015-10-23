// lmviewer.js
// Copyright (C) 2015 by Jeremy Tammik, Autodesk Inc.
// initialise lmv, the Autodesk View and Data API large model viewer
// load document, the translated CAD model

var display_user_interface = true;

var lmvAuthToken = new LmvAuthToken();

//var urn_little_house = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29tcGhvdW5kLWJ1Y2tldC9saXR0bGVfaG91c2VfMjAxNi5ydnQ';
//var urn_rst_advanced_sample_project = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29tcGhvdW5kLWJ1Y2tldC9yc3RfYWR2YW5jZWRfc2FtcGxlX3Byb2plY3QucnZ0';

function getToken() {
  return lmvAuthToken.value();
}

function lmv_loadDocument(viewer, documentId) {

  // Register callback to determine GUID to
  // LMV node id mapping when loading completes.

  viewer.addEventListener(
    Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
    function(e) {
      console.log('GEOMETRY_LOADED_EVENT handler');
      if (viewer.model) {
        viewer.getObjectTree(
          function (instanceTree) {
            createGuidToNodeMapping(viewer, instanceTree.root);
          }
        );
      }
    }
  );

  // Find the first 3d geometry and load that.

  Autodesk.Viewing.Document.load(
    documentId,
    function(doc) {
      var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
        doc.getRootItem(),
        { 'type' : 'geometry', 'role' : '3d' },
        true);

      if (geometryItems.length > 0) {
        viewer.load(doc.getViewablePath(geometryItems[0]));
      }
    },
    function(errorMsg) { // onErrorCallback
      alert('Load Error: ' + errorMsg);
    }
  );
}

function lmv_initialize( urn ) {
  var options = {
    'document' : 'urn:' + urn,
    'env':'AutodeskProduction',
    'getAccessToken': getToken,
    'refreshToken': getToken
  };

  var viewerElement = document.getElementById('viewer');

  if( display_user_interface ) {
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement, {});
  }
  else {
    var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});
  }

  Autodesk.Viewing.Initializer(options,function() {
    viewer.initialize();
    lmv_loadDocument( viewer, options.document );
  });
  return viewer;
}
