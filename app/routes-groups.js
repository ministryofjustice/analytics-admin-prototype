module.exports = function(router, _, constants, groups, users, apps, groupTools) {
  router.get('/groups/list', function (req, res) {
    res.render('groups/list', {
      groups: groups
    });
  });
  router.get('/groups/edit/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index);

    res.render('groups/edit', {
      group: group
    });
  });
  router.post('/groups/update/:groupId', function (req, res) {
    if(groupTools.updateGroup(req.params.groupId, req.body)) {
      res.redirect('/groups/show/' + req.params.groupId);
    } else {
      console.log('update group failed');
      res.send('update group failed');
    }
  });
  router.post('/groups/add', function (req, res) {
    if(groupTools.newGroup(req.body)) {
      res.redirect('/groups/list');
    } else {
      console.log('add group failed');
      res.send('add group failed');
    }
  });
  router.get('/groups/edit-members/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index),
      members = groupTools.getGroupMembers(req.params.index);

    res.render('groups/edit-members', {
      group: group,
      members: members,
      grouproles: constants.GROUP_ROLES,
      usersNotInGroup: _.difference(users, members)
    });
  });
  router.get('/groups/add-member/:index', function (req, res) {
    if(groupTools.newMember(req.params.index, req.query['add-member'])) {
      res.redirect('/groups/edit-members/' + req.params.index);
    } else {
      console.log('add member failed');
    }
  });
  router.get('/groups/remove-member/:groupId/:memberId', function (req, res) {
    if(groupTools.deleteMember(req.params.groupId, req.params.memberId)) {
      res.redirect('/groups/edit-members/' + req.params.groupId);
    } else {
      console.log('remove member failed - group must contain one or more members, one or more of whom must be admins');
      res.send('Remove member failed - group must contain one or more members, one or more of whom must be admins');
    }
  });
  router.get('/groups/toggle-admin-role/:groupId/:memberId', function (req, res) {
    if(groupTools.toggleAdminRole(req.params.groupId, req.params.memberId)) {
      res.redirect('/groups/edit-members/' + req.params.groupId);
    } else {
      console.log('toggle member admin role failed');
      res.send('Groups must contain at least one admin');
    }
  });
  router.get('/groups/edit-apps/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index),
      groupApps = groupTools.getGroupApps(req.params.index);

    res.render('groups/edit-apps', {
      group: group,
      groupApps: groupApps,
      appsNotAvailableToGroup: _.difference(apps, groupApps)
    });
  });
  router.get('/groups/add-app/:index', function (req, res) {
    if(groupTools.newApp(req.params.index, req.query['add-app'])) {
      res.redirect('/groups/edit-apps/' + req.params.index);
    } else {
      console.log('add app failed');
    }
  });
  router.get('/groups/remove-app/:groupId/:appId', function (req, res) {
    if(groupTools.deleteApp(req.params.groupId, req.params.appId)) {
      res.redirect('/groups/edit-apps/' + req.params.groupId);
    } else {
      console.log('remove app failed');
      res.send('Remove app failed');
    }
  });

  router.get('/groups/show/:index', function (req, res) {
    var group = groupTools.getGroup(req.params.index),
      members = groupTools.getGroupMembers(req.params.index),
      groupApps = groupTools.getGroupApps(req.params.index);

    res.render('groups/show', {
      group: group,
      members: members,
      groupApps: groupApps,
      grouproles: constants.GROUP_ROLES
    });
  });
}
