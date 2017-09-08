module.exports = function(router, constants, datasources, datasourceTools) {
  router.get('/datasources/list', function (req, res) {
    res.render('datasources/list', {
      datasources: datasources
    });
  });
  router.get('/datasources/edit/:index', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.index);

    res.render('datasources/edit', {
      datasource: datasource
    });
  });
  router.post('/datasources/update/:datasourceId', function (req, res) {
    if(datasourceTools.updateDatasource(req.params.datasourceId, req.body)) {
      res.redirect('/datasources/show/' + req.params.datasourceId);
    } else {
      console.log('update datasource failed');
      res.send('update datasource failed');
    }
  });
  router.post('/datasources/add', function (req, res) {
    if(datasourceTools.newDatasource(req.body)) {
      res.redirect('/datasources/list');
    } else {
      console.log('add datasource failed');
      res.send('add datasource failed');
    }
  });
  router.get('/datasources/show/:datasourceId', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.datasourceId),
      datasourceApps = datasourceTools.getDatasourceApps(req.params.datasourceId),
      appsWithoutDatasource = datasourceTools.getAppsWithoutDatasource(req.params.datasourceId);

    res.render('datasources/show', {
      datasource: datasource,
      datasourceApps: datasourceApps,
      appsWithoutDatasource: appsWithoutDatasource
    });
  });
  router.post('/datasources/add-datasource-to-app/:datasourceId', function (req, res) {
    if(datasourceTools.addDatasourceToApp(req.params.datasourceId, req.body)) {
      res.redirect('/datasources/show/' + req.params.datasourceId);
    } else {
      console.log('add datasource to app failed');
      res.send('add datasource to app failed');
    }
  });
  router.get('/datasources/delete/:datasourceId', function (req, res) {
    if(datasourceTools.deleteDatasource(req.params.datasourceId)) {
      res.redirect('/datasources/list');
    } else {
      console.log('delete datasource failed');
      res.send('delete datasource failed');
    }
  });
}
