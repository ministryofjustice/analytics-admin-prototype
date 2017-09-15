module.exports = function(router, _, constants, apps, datasources, appTools) {
  router.get('/admin/apps/list', function (req, res) {
    res.render('admin/apps/list', {
      apps: apps
    });
  });
  router.get('/admin/apps/edit/:index', function (req, res) {
    var app = appTools.getApp(req.params.index);

    res.render('admin/apps/edit', {
      app: app
    });
  });
  router.get('/admin/apps/edit-datasources/:index', function (req, res) {
    var app = appTools.getApp(req.params.index),
      appDatasources = appTools.getAppDatasources(req.params.index);

    res.render('admin/apps/edit-datasources', {
      app: app,
      appDatasources: appDatasources,
      datasourcesUnavailableToApp: _.difference(datasources, appDatasources)
    });
  });
  router.post('/admin/apps/add-datasource/:appId', function (req, res) {
    if(appTools.addAppDatasource(req.params.appId, req.body)) {
      res.redirect('/admin/apps/edit-datasources/' + req.params.appId);
    } else {
      console.log('add app datasource failed');
      res.send('add app datasource failed');
    }
  });
  router.get('/admin/apps/remove-datasource/:appId/:datasourceId', function (req, res) {
    if(appTools.removeAppDatasource(req.params.appId, req.params.datasourceId)) {
      res.redirect('/admin/apps/edit-datasources/' + req.params.appId);
    } else {
      console.log('remove app datasource failed');
      res.send('remove app datasource failed');
    }
  });
  router.post('/admin/apps/update/:appId', function (req, res) {
    if(appTools.updateApp(req.params.appId, req.body)) {
      res.redirect('/admin/apps/show/' + req.params.appId);
    } else {
      console.log('update app failed');
      res.send('update app failed');
    }
  });
  router.post('/admin/apps/add', function (req, res) {
    if(appTools.newApp(req.body)) {
      res.redirect('/admin/apps/list');
    } else {
      console.log('add app failed');
      res.send('add app failed');
    }
  });
  router.get('/admin/apps/show/:index', function (req, res) {
    var app = appTools.getApp(req.params.index),
      appDatasources = appTools.getAppDatasources(req.params.index);

    res.render('admin/apps/show', {
      app: app,
      appDatasources: appDatasources
    });
  });
  router.get('/admin/apps/delete/:appId', function (req, res) {
    if(appTools.deleteApp(req.params.appId)) {
      res.redirect('/admin/apps/list');
    } else {
      console.log('delete app failed');
      res.send('delete app failed');
    }
  });
}
