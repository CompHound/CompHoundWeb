module.exports = function(app) {
  var instances = require('./controller/instances_v1');
  app.get('/api/v1/instances', instances.findAll);
  app.get('/api/v1/instances/:id', instances.findById);
  app.post('/api/v1/instances', instances.add);
  app.put('/api/v1/instances/:id', instances.update);
  app.delete('/api/v1/instances/:id', instances.delete);
  app.get('/api/v1/instances/project/:pid', instances.findAllForProject);
}
