'use strict';

var _ = require('lodash');
var users = require('../assets/data/dummy-users.json');

var userTools = {
  getUser: function(id) {
    return _.find(users, {'id': parseInt(id, 10)});
  }
};

module.exports = userTools;
