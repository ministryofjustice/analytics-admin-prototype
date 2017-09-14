module.exports = function(router, _, constants, groups, users, apps, groupTools) {
  router.get('/admin/groups/list', function (req, res) {
    res.render('admin/groups/list', {
      groups: groups
    });
  });
  router.get('/admin/groups/edit/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index);

    res.render('admin/groups/edit', {
      group: group
    });
  });
  router.post('/admin/groups/update/:groupId', function (req, res) {
    if(groupTools.updateGroup(req.params.groupId, req.body)) {
      res.redirect('/admin/groups/show/' + req.params.groupId);
    } else {
      console.log('update group failed');
      res.send('update group failed');
    }
  });
  router.post('/admin/groups/add', function (req, res) {
    if(groupTools.newGroup(req.body)) {
      res.redirect('/admin/groups/list');
    } else {
      console.log('add group failed');
      res.send('add group failed');
    }
  });
  router.get('/admin/groups/edit-members/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index),
      members = groupTools.getGroupMembers(req.params.index);

    res.render('admin/groups/edit-members', {
      group: group,
      members: members,
      grouproles: constants.GROUP_ROLES,
      usersNotInGroup: _.difference(users, members)
    });
  });
  router.get('/admin/groups/add-member/:index', function (req, res) {
    if(groupTools.newMember(req.params.index, req.query['add-member'])) {
      res.redirect('/admin/groups/edit-members/' + req.params.index);
    } else {
      console.log('add member failed');
    }
  });
  router.get('/admin/groups/remove-member/:groupId/:memberId', function (req, res) {
    if(groupTools.deleteMember(req.params.groupId, req.params.memberId)) {
      res.redirect('/admin/groups/edit-members/' + req.params.groupId);
    } else {
      console.log('remove member failed - group must contain one or more members, one or more of whom must be admins');
      res.send('Remove member failed - group must contain one or more members, one or more of whom must be admins');
    }
  });
  router.get('/admin/groups/toggle-admin-role/:groupId/:memberId', function (req, res) {
    if(groupTools.toggleAdminRole(req.params.groupId, req.params.memberId)) {
      res.redirect('/admin/groups/edit-members/' + req.params.groupId);
    } else {
      console.log('toggle member admin role failed');
      res.send('Groups must contain at least one admin');
    }
  });
  router.get('/admin/groups/edit-apps/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index),
      groupApps = groupTools.getGroupApps(req.params.index);

    res.render('admin/groups/edit-apps', {
      group: group,
      groupApps: groupApps,
      appsNotAvailableToGroup: _.difference(apps, groupApps)
    });
  });
  router.get('/admin/groups/add-app/:index', function (req, res) {
    if(groupTools.newApp(req.params.index, req.query['add-app'])) {
      res.redirect('/admin/groups/edit-apps/' + req.params.index);
    } else {
      console.log('add app failed');
    }
  });
  router.get('/admin/groups/remove-app/:groupId/:appId', function (req, res) {
    if(groupTools.deleteApp(req.params.groupId, req.params.appId)) {
      res.redirect('/admin/groups/edit-apps/' + req.params.groupId);
    } else {
      console.log('remove app failed');
      res.send('Remove app failed');
    }
  });
  router.get('/admin/groups/show/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index),
      members = groupTools.getGroupMembers(req.params.index),
      groupApps = groupTools.getGroupApps(req.params.index);

    res.render('admin/groups/show', {
      group: group,
      members: members,
      groupApps: groupApps,
      grouproles: constants.GROUP_ROLES
    });
  });
  router.get('/admin/groups/delete/:groupId', function (req, res) {
    if(groupTools.deleteGroup(req.params.groupId)) {
      res.redirect('/admin/groups/list');
    } else {
      console.log('delete group failed');
      res.send('delete group failed');
    }
  });
}
