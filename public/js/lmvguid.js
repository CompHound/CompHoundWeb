// lmvguid.js
// Copyright (C) 2015 by Jeremy Tammik, Autodesk Inc.
// determine LMV node id for a given Revit element

// http://forums.autodesk.com/t5/view-and-data-api/how-to-get-object-s-dbid-from-its-guid/m-p/5226933

var guidToNodeIdMapping = null;

function createGuidToNodeMapping(viewer, modelRoot) {
  console.log('createGuidToNodeMapping begin');
  var nodesToProcess = [];
  var currentMapping = {};

  // Get all the nodes rooted at this model root.

  function getAllNodes(root) {
    if (root.children) {
      for (var k = 0; k < root.children.length; k++) {
        var child = root.children[k];
        nodesToProcess.push(child);
        getAllNodes(child);
      }
    }
  }

  getAllNodes(modelRoot);

  function processNode(node, onNodeProcessed) {

    // Get the property value for the given
    // property name, if it exists.

    function getPropertyValue(properties, propertyName) {
      for (var i = 0; i < properties.length; ++i) {
        var property = properties[i];
        if (property.displayName === propertyName) {
          return property.displayValue;
        }
      }
      return null;
    }

    // When the properties are retrieved, map the
    // node's guid to its id, if the guid exists.

    function onPropertiesRetrieved(result) {
      var guid = getPropertyValue(result.properties, 'Guid');
      if (guid) {
        currentMapping[guid] = node.dbId;
      }
      onNodeProcessed();
    }

    // On error, move on to the next node.

    function onError(status, message, data) {
      onNodeProcessed();
    }

    viewer.getProperties(node.dbId,
      onPropertiesRetrieved, onError);
  }

  // Process the nodes one by one.

  function processNext() {
    var n = nodesToProcess.length;
    console.log('createGuidToNodeMapping processNext with '
                + n.toString() + ' nodes left');

    if (n > 0) {
      processNode(nodesToProcess.shift(), processNext);
    } else {
      // No more nodes to process - the mapping is complete.
      guidToNodeIdMapping = currentMapping;
    }
  }

  processNext();
  console.log('createGuidToNodeMapping end');
}

function getNodeIdByGuid (guid) {
  if(guidToNodeIdMapping && guid in guidToNodeIdMapping) {
    return guidToNodeIdMapping[guid];
  }
  return null;
};
