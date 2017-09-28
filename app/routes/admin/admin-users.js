module.exports = function(router, _, constants, users, userTools) {
  router.get('/admin/users/list', function (req, res) {
    res.render('admin/users/list', {
      users: users
    });
  });
  router.get('/admin/users/edit/:userId', function (req, res) {
    var user = userTools.getUser(req.params.userId),
      userApps = userTools.getUserApps(req.params.userId),
      appsNotAvailableToUser = userTools.getAppsNotAvailableToUser(req.params.userId),
      userDatasources = userTools.getUserDatasources(req.params.userId),
      datasourcesNotAvailableToUser = userTools.getDatasourcesNotAvailableToUser(req.params.userId);

    res.render('admin/users/edit', {
      user: user,
      userApps: userApps,
      appsNotAvailableToUser: appsNotAvailableToUser,
      userDatasources: userDatasources,
      datasourcesNotAvailableToUser: datasourcesNotAvailableToUser
    });
  });
  router.get('/admin/users/show/:userId', function (req, res) {
    var user = userTools.getUser(req.params.userId),
      userApps = userTools.getUserApps(req.params.userId),
      userDatasources = userTools.getUserDatasources(req.params.userId);

    res.render('admin/users/show', {
      user: user,
      userApps: userApps,
      userDatasources: userDatasources
    });
  });
  router.post('/admin/users/update/:userId', function (req, res) {
    if(userTools.updateUser(req.params.userId, req.body)) {
      res.redirect('/admin/users/edit/' + req.params.userId);
    } else {
      console.log('update user failed');
      res.send('update user failed');
    }
  });
  router.post('/admin/users/add-user-to-app/:userId', function (req, res) {
    if(userTools.addUserToApp(req.params.userId, req.body)) {
      res.redirect('/admin/users/edit/' + req.params.userId);
    } else {
      console.log('add user to app failed');
      res.send('add user to app failed');
    }
  });
  router.get('/admin/users/remove-user-from-app/:userId/:appId', function (req, res) {
    if(userTools.removeUserFromApp(req.params.userId, req.params.appId)) {
      res.redirect('/admin/users/edit/' + req.params.userId);
    } else {
      console.log('remove user from app failed');
      res.send('remove user from app failed');
    }
  });
  router.post('/admin/users/add-datasource-to-user/:userId', function (req, res) {
    if(userTools.addDatasourceToUser(req.params.userId, req.body)) {
      res.redirect('/admin/users/edit/' + req.params.userId);
    } else {
      console.log('add datasource to user failed');
      res.send('add datasource to user failed');
    }
  });
  router.get('/admin/users/remove-datasource-from-user/:datasourceId/:userId', function (req, res) {
    if(userTools.removeDatasourceFromUser(req.params.userId, req.params.datasourceId)) {
      res.redirect('/admin/users/edit/' + req.params.userId);
    } else {
      console.log('remove datasource from user failed');
      res.send('remove datasource from user failed');
    }
  });
  router.get('/admin/users/toggle-datasource-admin-role/:datasourceId/:userId', function (req, res) {
    if(userTools.toggleDatasourceAdminRole(req.params.datasourceId, req.params.userId)) {
      res.redirect('/admin/users/edit/' + req.params.userId);
    } else {
      console.log('toggle datasource admin role failed');
      res.send('toggle datasource admin role failed');
    }
  });
  router.post('/admin/users/add', function (req, res) {
    if(userTools.newUser(req.body)) {
      res.redirect('/admin/users/list');
    } else {
      console.log('add user failed');
      res.send('add user failed');
    }
  });
  router.get('/admin/users/delete/:userId', function (req, res) {
    if(userTools.deleteUser(req.params.userId)) {
      res.redirect('/admin/users/list');
    } else {
      console.log('delete user failed');
      res.send('delete user failed - that user may be the only admin in a group');
    }
  });
}
