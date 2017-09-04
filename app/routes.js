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
router.get('/apps/show/:index', function (req, res) {
  var app = appTools.getApp(req.params.index),
    appGroups = appTools.getAppGroups(req.params.index),
    appDataSources = appTools.getAppDatasources(req.params.index);

  res.render('apps/show', {
    app: app,
    appGroups: appGroups,
    appDataSources: appDataSources
  });
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
router.get('/datasources/show/:index', function (req, res) {
  var datasource = datasourceTools.getDatasource(req.params.index),
    datasourceApps = datasourceTools.getDatasourceApps(req.params.index);

  res.render('datasources/show', {
    datasource: datasource,
    datasourceApps: datasourceApps
  });
});


module.exports = router;
