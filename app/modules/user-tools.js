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
          userGroups.push({
            id: group.id,
            name: group.name,
            memberRole: group.members[y].role
          });
        }
      }
    }

    return userGroups;
  },
  updateUser: function(userId, userObj) {
    var userIndex = _.findIndex(users, {'id': parseInt(userId, 10)});

    users[userIndex].name = userObj.name;
    users[userIndex].email = userObj.email;
    users[userIndex].github_username = userObj.github_username;

    return true;
  }
};

module.exports = userTools;
