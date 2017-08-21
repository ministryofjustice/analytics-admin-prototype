var express = require('express');
var router = express.Router();
var groupTools = require('./modules/group-tools.js');
var appTools = require('./modules/app-tools.js');

var users = require('./assets/data/dummy-users.json');
var apps = require('./assets/data/dummy-apps.json');
var groups = require('./assets/data/dummy-groups.json');

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
  res.render('users/edit');
});

// apps
router.get('/apps/list', function (req, res) {
  res.render('apps/list', {
    apps: apps
  });
});
router.get('/apps/edit/:index', function (req, res) {
  res.render('apps/edit');
});
router.get('/apps/show/:index', function (req, res) {
  var app = appTools.getApp(req.params.index),
    appGroups = appTools.getAppGroups(req.params.index);

  res.render('apps/show', {
    app: app,
    appGroups: appGroups
  });
});

// groups
router.get('/groups/list', function (req, res) {
  res.render('groups/list', {
    groups: groups
  });
});
router.get('/groups/edit/:index', function (req, res) {
  res.render('groups/edit');
});
router.get('/groups/show/:index', function (req, res) {
  var group = groupTools.getGroup(req.params.index),
    members = groupTools.getGroupMembers(req.params.index),
    apps = groupTools.getGroupApps(req.params.index);

  res.render('groups/show', {
    group: group,
    members: members,
    apps: apps
  });
});


module.exports = router;
