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
  router.get('/datasources/show/:index', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.index),
      datasourceApps = datasourceTools.getDatasourceApps(req.params.index);

    res.render('datasources/show', {
      datasource: datasource,
      datasourceApps: datasourceApps
    });
  });
}
