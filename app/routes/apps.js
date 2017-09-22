module.exports = function(router, _, appTools, datasources, constants) {
  router.get('/apps/show/:appId', function (req, res) {
    var app = appTools.getApp(req.params.appId),
      appGroup = appTools.getAppGroup(req.params.appId),
      appDatasources = appTools.getAppDatasources(req.params.appId);

    res.render('apps/show', {
      app: app,
      appGroup: appGroup,
      appDatasources: appDatasources
    });
  });
  router.get('/apps/manage/:appId', function (req, res) {
    var app = appTools.getApp(req.params.appId),
      appDatasources = appTools.getAppDatasources(req.params.appId),
      datasourcesUnavailableToApp = _.difference(datasources, appDatasources),
      appGroup = appTools.getAppGroup(req.params.appId),
      usersNotInAppGroup = appTools.getUsersNotInAppGroup(req.params.appId);

    res.render('apps/manage', {
      app: app,
      appDatasources: appDatasources,
      datasourcesUnavailableToApp: datasourcesUnavailableToApp,
      appGroup: appGroup,
      usersNotInAppGroup: usersNotInAppGroup
    });
  });
  router.post('/apps/update/:appId', function (req, res) {
    if(appTools.updateApp(req.params.appId, req.body)) {
      res.redirect('/apps/show/' + req.params.appId);
    } else {
      console.log('update app failed');
      res.send('update app failed');
    }
  });
  router.get('/apps/delete/:appId/:userId', function (req, res) {
    if(appTools.deleteApp(req.params.appId)) {
      res.redirect('/users/show/' + req.params.userId);
    } else {
      console.log('delete app failed');
      res.send('delete app failed');
    }
  });
  router.post('/apps/add-user/:appId', function (req, res) {
    if(appTools.addAppUser(req.params.appId, req.body)) {
      res.redirect('/apps/manage/' + req.params.appId);
    } else {
      console.log('add app user failed');
      res.send('add app user failed');
    }
  });
  router.get('/apps/remove-user/:appId/:userId', function (req, res) {
    if(appTools.removeAppUser(req.params.appId, req.params.userId)) {
      res.redirect('/apps/manage/' + req.params.appId);
    } else {
      console.log('remove app user failed');
      res.send('remove app user failed');
    }
  });
  router.get('/apps/toggle-admin-role/:appId/:userId', function (req, res) {
    if(appTools.toggleUserAdminRole(req.params.appId, req.params.userId)) {
      res.redirect('/apps/manage/' + req.params.appId);
    } else {
      console.log('toggle user admin role failed');
      res.send('toggle user admin role failed');
    }
  });
  router.post('/apps/new-add-datasource', function (req, res) {
    var formData = req.body,
      prefix = constants.strings.NEW_BUCKET_PREFIX;

    res.render('apps/new-add-datasource', {
      datasources: datasources,
      formData: formData,
      prefix: prefix
    });
  });
  router.post('/apps/create', function (req, res) {
    var formData = req.body,
      user_id = req.session.data.user_id;

    if(appTools.createNewApp(formData, user_id)) {
      res.redirect('/users/show/' + user_id);
    } else {
      console.log('create new app failed');
      res.send('create new app failed');
    }
  });
}

