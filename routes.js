module.exports = function(app) {
  var InstanceService = require('./controller/instances_v1');
  app.get('/api/v1/instances', InstanceService.findAll);
  app.get('/api/v1/instances/:id', InstanceService.findById);
  app.post('/api/v1/instances', InstanceService.add);
  app.put('/api/v1/instances/:id', InstanceService.update4);
  app.delete('/api/v1/instances/:id', InstanceService.delete);
  app.get('/api/v1/instances/project/:pid', InstanceService.findAllForProject);

  var LmvAuthorisationService = require('./lmvauth/AuthTokenServer');
  app.get('/api/v1/auth', LmvAuthorisationService.auth);
  // To-do: remove these unused endpoint.
  //app.get('/api/v1/auth-stg', LmvAuthorisationService.authstg);
  //app.get('/api/v1/auth-dev', LmvAuthorisationService.authdev);
  app.get('/api/v1/auth-test', LmvAuthorisationService.authtest);
}
