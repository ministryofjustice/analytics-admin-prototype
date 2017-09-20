module.exports = function(router, _, constants, apps, users, datasources, appTools) {
  router.get('/admin/apps/list', function (req, res) {
    res.render('admin/apps/list', {
      apps: apps
    });
  });
  router.get('/admin/apps/edit/:index', function (req, res) {
    var app = appTools.getApp(req.params.index),
      appDatasources = appTools.getAppDatasources(req.params.index),
      datasourcesUnavailableToApp = _.difference(datasources, appDatasources),
      appGroup = appTools.getAppGroup(req.params.index),
      usersNotInAppGroup = appTools.getUsersNotInAppGroup(req.params.index);

    res.render('admin/apps/edit', {
      app: app,
      appDatasources: appDatasources,
      datasourcesUnavailableToApp: datasourcesUnavailableToApp,
      appGroup: appGroup,
      usersNotInAppGroup: usersNotInAppGroup
    });
  });
  router.post('/admin/apps/add-user/:appId', function (req, res) {
    if(appTools.addAppUser(req.params.appId, req.body)) {
      res.redirect('/admin/apps/edit/' + req.params.appId);
    } else {
      console.log('add app user failed');
      res.send('add app user failed');
    }
  });
  router.get('/admin/apps/remove-user/:appId/:userId', function (req, res) {
    if(appTools.removeAppUser(req.params.appId, req.params.userId)) {
      res.redirect('/admin/apps/edit/' + req.params.appId);
    } else {
      console.log('remove app user failed');
      res.send('remove app user failed');
    }
  });
  router.get('/admin/apps/toggle-admin-role/:appId/:userId', function (req, res) {
    if(appTools.toggleUserAdminRole(req.params.appId, req.params.userId)) {
      res.redirect('/admin/apps/edit/' + req.params.appId);
    } else {
      console.log('toggle user admin role failed');
      res.send('toggle user admin role failed');
    }
  });
  router.post('/admin/apps/add-datasource/:appId', function (req, res) {
    if(appTools.addAppDatasource(req.params.appId, req.body)) {
      res.redirect('/admin/apps/edit/' + req.params.appId);
    } else {
      console.log('add app datasource failed');
      res.send('add app datasource failed');
    }
  });
  router.get('/admin/apps/remove-datasource/:appId/:datasourceId', function (req, res) {
    if(appTools.removeAppDatasource(req.params.appId, req.params.datasourceId)) {
      res.redirect('/admin/apps/edit/' + req.params.appId);
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
      appGroup = appTools.getAppGroup(req.params.index),
      appDatasources = appTools.getAppDatasources(req.params.index);

    res.render('admin/apps/show', {
      app: app,
      appGroup: appGroup,
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
