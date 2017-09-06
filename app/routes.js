var express = require('express');
var router = express.Router();
var _ = require('lodash');
var constants = require('./constants.json');
var groupTools = require('./modules/group-tools.js');
var appTools = require('./modules/app-tools.js');
var userTools = require('./modules/user-tools.js');
var datasourceTools = require('./modules/datasource-tools.js');

var users = require('./assets/data/dummy-users.json');
var apps = require('./assets/data/dummy-apps.json');
var groups = require('./assets/data/dummy-groups.json');
var datasources = require('./assets/data/dummy-datasources.json');

// Route index page
router.get('/', function (req, res) {
  res.render('index');
});

// add your routes here

// signout route
router.get('/signout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

// users
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
router.get('/users/show/:index', function (req, res) {
  var user = userTools.getUser(req.params.index),
    userGroups = userTools.getUserGroups(req.params.index);

  res.render('users/show', {
    user: user,
    userGroups: userGroups,
    grouproles: constants.GROUP_ROLES
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
  if(userTools.addUser(req.body)) {
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

// apps
router.get('/apps/list', function (req, res) {
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

// groups
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

// datasources
router.get('/datasources/list', function (req, res) {
  res.render('datasources/list', {
    datasources: datasources
  });
});
router.get('/datasources/edit/:index', function (req, res) {
  var datasource = datasourceTools.getDatasource(req.params.index);

  res.render('datasources/edit', {
    datasource: datasource
  });
});
router.post('/datasources/update/:datasourceId', function (req, res) {
  if(datasourceTools.updateDatasource(req.params.datasourceId, req.body)) {
    res.redirect('/datasources/show/' + req.params.datasourceId);
  } else {
    console.log('update datasource failed');
    res.send('update datasource failed');
  }
});
router.get('/datasources/show/:index', function (req, res) {
  var datasource = datasourceTools.getDatasource(req.params.index),
    datasourceApps = datasourceTools.getDatasourceApps(req.params.index);

  res.render('datasources/show', {
    datasource: datasource,
    datasourceApps: datasourceApps
  });
});


module.exports = router;
