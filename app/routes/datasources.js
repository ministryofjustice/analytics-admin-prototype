module.exports = function(router, constants, datasourceTools) {
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
      datasourceTools.addDatasourceToUser(newId, {'add-datasource-to-user': req.session.data.user_id});
      res.redirect('/datasources/show/' + newId);
    }
  });
}
