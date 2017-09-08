module.exports = function(router, _, constants, users, groups, userTools) {
  router.get('/users/list', function (req, res) {
    res.render('users/list', {
      users: users
    });
  });
  router.get('/users/edit/:index', function (req, res) {
    var user = userTools.getUser(req.params.index);

    res.render('users/edit', {
      user: user
    });
  });
  router.get('/users/show/:userId', function (req, res) {
    var user = userTools.getUser(req.params.userId),
      userGroups = userTools.getUserGroups(req.params.userId),
      groupsWithoutUser = userTools.getGroupsWithoutUser(req.params.userId);

    res.render('users/show', {
      user: user,
      userGroups: userGroups,
      grouproles: constants.GROUP_ROLES,
      groupsWithoutUser: groupsWithoutUser
    });
  });
  router.post('/users/update/:userId', function (req, res) {
    if(userTools.updateUser(req.params.userId, req.body)) {
      res.redirect('/users/show/' + req.params.userId);
    } else {
      console.log('update user failed');
      res.send('update user failed');
    }
  });
  router.post('/users/add', function (req, res) {
    if(userTools.newUser(req.body)) {
      res.redirect('/users/list');
    } else {
      console.log('update user failed');
      res.send('update user failed');
    }
  });
  router.get('/users/delete/:userId', function (req, res) {
    if(userTools.deleteUser(req.params.userId)) {
      res.redirect('/users/list');
    } else {
      console.log('delete user failed');
      res.send('delete user failed - that user may be the only admin in a group');
    }
  });
  router.post('/users/add-user-to-group/:userId', function (req, res) {
    if(userTools.addUserToGroup(req.params.userId, req.body)) {
      res.redirect('/users/show/' + req.params.userId);
    } else {
      console.log('add user to group failed');
      res.send('add user to group failed');
    }
  });

}
