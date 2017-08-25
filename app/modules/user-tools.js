'use strict';

var _ = require('lodash'),
  constants = require('../constants.json'),
  groups = require('../assets/data/dummy-groups.json'),
  users = require('../assets/data/dummy-users.json');

var userTools = {
  getUser: function(id) {
    return _.find(users, {'id': parseInt(id, 10)});
  },
  getUserGroups: function(id) {
    var x,
      y,
      group,
      userGroups = [];

    for (x = 0; x < constants.quantities.NUM_GROUPS; x += 1) {
      group = groups[x];
      for (y = 0; y < group.members.length; y += 1) {
        if (group.members[y].id === parseInt(id, 10)) {
          userGroups.push(group);
        }
      }
    }

    return userGroups;
  }
};

module.exports = userTools;
