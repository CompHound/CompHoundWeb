var mongoose = require('mongoose'),

Instance = mongoose.model('Instance');

InstanceService = {

  findAll : function(req, res){
    Instance.find({},function(err, results) {
      return res.send(results);
    });
  },

  findById : function(req, res){
    var id = req.params.id;
    Instance.findOne({'_id':id},function(err, result) {
      return res.send(result);
    });
  },

  add : function(req, res) {
    Instance.create(req.body, function (err, instance) {
      if (err) return console.log(err);
      return res.send(instance);
    });
  },

  update3 : function(req, res) {
    var id = req.params.id;
    console.log('Updating ' + id);
    Instance.update({"_id":id}, req.body, {upsert:true},
      function (err, numberAffected) {
        if (err) return console.log(err);
        console.log('Updated %s instances', numberAffected.toString());
        return res.sendStatus(202);
    });
  },

  delete : function(req, res){
    var id = req.params.id;
    Instance.remove({'_id':id},function(result) {
      return res.send(result);
    });
  },

  findAllForProject : function(req, res){
    var pid = req.params.pid;
    Instance.find({'project_id':pid},function(err, results) {
      return res.send(results);
    });
  }
};

module.exports = InstanceService;
