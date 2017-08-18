var express = require('express');
var router = express.Router();

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

// groups
router.get('/groups/list', function (req, res) {
  res.render('groups/list', {
    groups: groups
  });
});
router.get('/groups/edit/:index', function (req, res) {
  res.render('groups/edit');
});


module.exports = router;
