module.exports = function(app) {
  var InstanceService = require('./controller/instances_v1');
  app.get('/api/v1/instances', InstanceService.findAll);
  app.get('/api/v1/instances/:id', InstanceService.findById);
  app.post('/api/v1/instances', InstanceService.add);
  app.put('/api/v1/instances/:id', InstanceService.update4);
  app.delete('/api/v1/instances/:id', InstanceService.delete);
  app.get('/api/v1/instances/project/:pid', InstanceService.findAllForProject);
}
