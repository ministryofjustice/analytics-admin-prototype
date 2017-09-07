module.exports = function(router, _, constants, apps, groups, datasources, appTools) {
  router.get('/apps/list', function (req, res) {
    console.log(apps);
    res.render('apps/list', {
      apps: apps
    });
  });
  router.get('/apps/edit/:index', function (req, res) {
    var app = appTools.getApp(req.params.index);

    res.render('apps/edit', {
      app: app
    });
  });
  router.get('/apps/edit-groups/:index', function (req, res) {
    var app = appTools.getApp(req.params.index),
      appGroups = appTools.getAppGroups(req.params.index);

    res.render('apps/edit-groups', {
      app: app,
      appGroups: appGroups,
      groupsNotGrantedAccessToApp: _.difference(groups, appGroups)
    });
  });
  router.post('/apps/add-group/:appId', function (req, res) {
    if(appTools.addAppGroup(req.params.appId, req.body)) {
      res.redirect('/apps/edit-groups/' + req.params.appId);
    } else {
      console.log('add app group failed');
      res.send('add app group failed');
    }
  });
  router.get('/apps/remove-group/:appId/:groupId', function (req, res) {
    if(appTools.removeAppGroup(req.params.appId, req.params.groupId)) {
      res.redirect('/apps/edit-groups/' + req.params.appId);
    } else {
      console.log('remove app group failed');
      res.send('remove app group failed');
    }
  });
  router.get('/apps/edit-datasources/:index', function (req, res) {
    var app = appTools.getApp(req.params.index),
      appDatasources = appTools.getAppDatasources(req.params.index);

    res.render('apps/edit-datasources', {
      app: app,
      appDatasources: appDatasources,
      datasourcesUnavailableToApp: _.difference(datasources, appDatasources)
    });
  });
  router.post('/apps/add-datasource/:appId', function (req, res) {
    if(appTools.addAppDatasource(req.params.appId, req.body)) {
      res.redirect('/apps/edit-datasources/' + req.params.appId);
    } else {
      console.log('add app datasource failed');
      res.send('add app datasource failed');
    }
  });
  router.get('/apps/remove-datasource/:appId/:datasourceId', function (req, res) {
    if(appTools.removeAppDatasource(req.params.appId, req.params.datasourceId)) {
      res.redirect('/apps/edit-datasources/' + req.params.appId);
    } else {
      console.log('remove app datasource failed');
      res.send('remove app datasource failed');
    }
  });
  router.post('/apps/update/:appId', function (req, res) {
    if(appTools.updateApp(req.params.appId, req.body)) {
      res.redirect('/apps/show/' + req.params.appId);
    } else {
      console.log('update app failed');
      res.send('update app failed');
    }
  });
  router.post('/apps/add', function (req, res) {
    if(appTools.addApp(req.body)) {
      res.redirect('/apps/list');
    } else {
      console.log('update app failed');
      res.send('update app failed');
    }
  });
  router.get('/apps/show/:index', function (req, res) {
    var app = appTools.getApp(req.params.index),
      appGroups = appTools.getAppGroups(req.params.index),
      appDatasources = appTools.getAppDatasources(req.params.index);

    res.render('apps/show', {
      app: app,
      appGroups: appGroups,
      appDatasources: appDatasources
    });
  });
  router.get('/apps/delete/:appId', function (req, res) {
    if(appTools.deleteApp(req.params.appId)) {
      res.redirect('/apps/list');
    } else {
      console.log('delete app failed');
      res.send('delete app failed');
    }
  });
}
