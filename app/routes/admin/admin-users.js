module.exports = function(router, _, constants, users, userTools) {
  router.get('/admin/users/list', function (req, res) {
    res.render('admin/users/list', {
      users: users
    });
  });
  router.get('/admin/users/edit/:index', function (req, res) {
    var user = userTools.getUser(req.params.index);

    res.render('admin/users/edit', {
      user: user
    });
  });
  router.get('/admin/users/show/:userId', function (req, res) {
    var user = userTools.getUser(req.params.userId),
      userApps = userTools.getUserApps(req.params.userId);

    res.render('admin/users/show', {
      user: user,
      userApps: userApps
    });
  });
  router.post('/admin/users/update/:userId', function (req, res) {
    if(userTools.updateUser(req.params.userId, req.body)) {
      res.redirect('/admin/users/show/' + req.params.userId);
    } else {
      console.log('update user failed');
      res.send('update user failed');
    }
  });
  router.post('/admin/users/add', function (req, res) {
    if(userTools.newUser(req.body)) {
      res.redirect('/admin/users/list');
    } else {
      console.log('update user failed');
      res.send('update user failed');
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
