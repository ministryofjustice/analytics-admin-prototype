module.exports = function(router, constants, datasources, datasourceTools) {
  router.get('/admin/datasources/list', function (req, res) {
    res.render('admin/datasources/list', {
      datasources: datasources
    });
  });
  router.get('/admin/datasources/edit/:index', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.index);

    res.render('admin/datasources/edit', {
      datasource: datasource
    });
  });
  router.post('/admin/datasources/update/:datasourceId', function (req, res) {
    if(datasourceTools.updateDatasource(req.params.datasourceId, req.body)) {
      res.redirect('/admin/datasources/show/' + req.params.datasourceId);
    } else {
      console.log('update datasource failed');
      res.send('update datasource failed');
    }
  });
  router.post('/admin/datasources/add', function (req, res) {
    if(datasourceTools.newDatasource(req.body)) {
      res.redirect('/admin/datasources/list');
    } else {
      console.log('add datasource failed');
      res.send('add datasource failed');
    }
  });
  router.get('/admin/datasources/show/:datasourceId', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.datasourceId),
      datasourceApps = datasourceTools.getDatasourceApps(req.params.datasourceId),
      appsWithoutDatasource = datasourceTools.getAppsWithoutDatasource(req.params.datasourceId);

    res.render('admin/datasources/show', {
      datasource: datasource,
      datasourceApps: datasourceApps,
      appsWithoutDatasource: appsWithoutDatasource
    });
  });
  router.post('/admin/datasources/add-datasource-to-app/:datasourceId', function (req, res) {
    if(datasourceTools.addDatasourceToApp(req.params.datasourceId, req.body)) {
      res.redirect('/admin/datasources/show/' + req.params.datasourceId);
    } else {
      console.log('add datasource to app failed');
      res.send('add datasource to app failed');
    }
  });
  router.get('/admin/datasources/delete/:datasourceId', function (req, res) {
    if(datasourceTools.deleteDatasource(req.params.datasourceId)) {
      res.redirect('/admin/datasources/list');
    } else {
      console.log('delete datasource failed');
      res.send('delete datasource failed');
    }
  });
}
