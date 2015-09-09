var mongoose = require('mongoose'),

Instance = mongoose.model('Instance');

exports.findAll = function(req, res){
  Instance.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Instance.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Instance.create(req.body, function (err, instance) {
    if (err) return console.log(err);
    return res.send(instance);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  //console.log(req.body);
  console.log('Updating ' + id);
  Instance.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %s instances', numberAffected.toString());
      return res.sendStatus(202);
  });
};

exports.update2 = function(req, res) {
  var id = req.params.id;
  //console.log(req.body);
  console.log('Updating ' + id);
  Instance.findOne({'_id':id},function(err, result) {
    if(result) {
      Instance.update({"_id":id}, req.body,
        function (err, numberAffected) {
          if (err) return console.log(err);
          console.log('Updated %s instances', numberAffected.toString());
          return res.sendStatus(202);
      });
    }
    else {
      Instance.create(req.body, function (err, instance) {
        if (err) return console.log(err);
        return res.send(instance);
      });
    }
  });
};

exports.delete = function(req, res){
  var id = req.params.id;
  Instance.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.findAllForProject = function(req, res){
  var pid = req.params.pid;
  Instance.find({'project_id':pid},function(err, results) {
    return res.send(results);
  });
};

//exports.populate_ten_sample_instances = function(req, res){
//
//  // given: a Revit instance element UniqeId;
//  // it must obviously be unique in the database.
//
//  var instance_unique_id
//    = '60f91daf-3dd7-4283-a86d-24137b73f3da-0001fd0b';
//
//  Project.findOne({'title':'rac_basic_sample_project.rvt'}
//  , function(err, result) {
//    var pid = result._id;
//
//    console.log( 'project_id = ' + pid );
//
//    for( var i = 0; i < 10; ++i ) {
//      var s = i.toString();
//
//      Instance.create({
//        '_id': instance_unique_id + s,
//        'project_id': pid,
//        'level': 'Level ' + s,
//        'tag': 'Tag ' + s }
//      , function (err) {
//        if (err) return console.log(err);
//        console.log( 'save instance returned err = ' + err );
//        return res.send(202);
//      });
//    }
//  });
//};
