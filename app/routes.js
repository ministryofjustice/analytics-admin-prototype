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

// signout route
router.get('/signout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

// users
require('./routes-users.js') (router, constants, users, userTools);

// apps
require('./routes-apps.js') (router, _, constants, apps, groups, datasources, appTools);

// groups
require('./routes-groups.js') (router, _, constants, groups, users, apps, groupTools);

// datasources
require('./routes-datasources.js') (router, constants, datasources, datasourceTools);


module.exports = router;
