var express = require('express');
var router = express.Router();
var _ = require('lodash');
var constants = require('./constants.json');
var appTools = require('./modules/app-tools.js');
var userTools = require('./modules/user-tools.js');
var datasourceTools = require('./modules/datasource-tools.js');

var users = require('./assets/data/dummy-users.json');
var apps = require('./assets/data/dummy-apps.json');
var datasources = require('./assets/data/dummy-datasources.json');

// Route index page
router.get('/', function (req, res) {
  res.render('index', {
    users: users
  });
});

// signin route
router.post('/signin', function (req, res) {
  var homepage = req.body.homepage;

  if(req.body.user_type === 'regular-user') {
    homepage += '/' + req.body.user_id;
  }
  res.redirect(homepage);
});
// signout route
router.get('/signout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


// admin routes
// homepage
require('./routes/admin/admin-home.js') (router, users, apps, datasources);
// users
require('./routes/admin/admin-users.js') (router, _, constants, users, userTools);
// apps
require('./routes/admin/admin-apps.js') (router, _, constants, apps, users, datasources, appTools);
// datasources
require('./routes/admin/admin-datasources.js') (router, constants, datasources, datasourceTools);

// user routes
// homepage
require('./routes/home.js') (router, userTools);
//users
require('./routes/users.js') (router, userTools);
// apps
require('./routes/apps.js') (router, _, constants, datasources, appTools);
//datasources
require('./routes/datasources.js') (router, constants, datasourceTools, userTools);


module.exports = router;
