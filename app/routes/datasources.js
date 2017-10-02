module.exports = function(router, constants, datasourceTools, userTools) {
  router.get('/datasources/show/:datasourceId', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.datasourceId),
      datasourceApps = datasourceTools.getDatasourceApps(req.params.datasourceId),
      datasourceUsers = datasourceTools.getDatasourceUsers(req.params.datasourceId);

    res.render('datasources/show', {
      datasource: datasource,
      datasourceApps: datasourceApps,
      datasourceUsers: datasourceUsers
    });
  });
  router.get('/datasources/new', function (req, res) {
    res.render('datasources/new', {
      prefix: constants.strings.NEW_BUCKET_PREFIX
    });
  });
  router.post('/datasources/new-datasource', function (req, res) {
    var newId = datasourceTools.newDatasource({'bucket_name': req.body['new-datasource-name']});

    if (newId) {
      datasourceTools.addDatasourceToUser(newId, {'add-datasource-to-user': req.session.data.user_id}, true);
      res.redirect('/datasources/show/' + newId);
    }
  });
  router.get('/datasources/delete/:datasourceId/:userId', function (req, res) {
    if (datasourceTools.deleteDatasource(req.params.datasourceId)) {
      res.redirect('/users/show/' + req.params.userId);
    }
  });
  router.get('/datasources/manage/:datasourceId', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.datasourceId),
      datasourceApps = datasourceTools.getDatasourceApps(req.params.datasourceId),
      appsWithoutDataSource = datasourceTools.getAppsWithoutDatasource(req.params.datasourceId),
      datasourceUsers = datasourceTools.getDatasourceUsers(req.params.datasourceId),
      usersWithoutDataSource = datasourceTools.getUsersWithoutDatasource(req.params.datasourceId);

    res.render('datasources/manage', {
      datasource: datasource,
      datasourceApps: datasourceApps,
      appsWithoutDataSource: appsWithoutDataSource,
      datasourceUsers: datasourceUsers,
      usersWithoutDataSource: usersWithoutDataSource
    });
  });
  router.get('/datasources/remove-app/:datasourceId/:appId', function (req, res) {
    if(datasourceTools.removeDatasourceApp(req.params.datasourceId, req.params.appId)) {
      res.redirect('/datasources/manage/' + req.params.datasourceId);
    } else {
      console.log('remove app from datasource failed');
      res.send('remove app from datasource failed');
    }
  });
  router.post('/datasources/add-datasource-to-app/:datasourceId', function (req, res) {
    if(datasourceTools.addDatasourceToApp(req.params.datasourceId, req.body)) {
      res.redirect('/datasources/manage/' + req.params.datasourceId);
    } else {
      console.log('add datasource to app failed');
      res.send('add datasource to app failed');
    }
  });
  router.get('/datasources/remove-user/:datasourceId/:userId', function (req, res) {
    if(datasourceTools.removeDatasourceUser(req.params.datasourceId, req.params.userId)) {
      res.redirect('/datasources/manage/' + req.params.datasourceId);
    } else {
      console.log('remove datasource from user failed');
      res.send('remove datasource from user failed');
    }
  });
  router.post('/datasources/add-datasource-to-user/:datasourceId', function (req, res) {
    if(datasourceTools.addDatasourceToUser(req.params.datasourceId, req.body)) {
      res.redirect('/datasources/manage/' + req.params.datasourceId);
    } else {
      console.log('add datasource to user failed');
      res.send('add datasource to user failed');
    }
  });
  router.get('/datasources/toggle-datasource-admin-role/:datasourceId/:userId', function (req, res) {
    if(userTools.toggleDatasourceAdminRole(req.params.datasourceId, req.params.userId)) {
      res.redirect('/datasources/manage/' + req.params.datasourceId);
    } else {
      console.log('toggle datasource admin role failed');
      res.send('toggle datasource admin role failed');
    }
  });
}
