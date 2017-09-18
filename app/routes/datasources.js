module.exports = function(router, datasourceTools) {
  router.get('/datasources/show/:datasourceId', function (req, res) {
    var datasource = datasourceTools.getDatasource(req.params.datasourceId),
      datasourceApps = datasourceTools.getDatasourceApps(req.params.datasourceId);

    res.render('datasources/show', {
      datasource: datasource,
      datasourceApps: datasourceApps
    });
  });
}
