'use strict';

var _ = require('lodash'),
  users = require('../assets/data/dummy-users.json'),
  apps = require('../assets/data/dummy-apps.json'),
  datasources = require('../assets/data/dummy-datasources.json');

var userTools = {
  getUser: function(id) {
    return _.find(users, {'id': parseInt(id, 10)});
  },
  getUserApps: function(id) {
    var userApps = [],
      x,
      appGroup,
      isMember;

    for (x = 0; x < apps.length; x += 1) {
      appGroup = apps[x].appGroup;

      isMember = _.find(appGroup, {'id': parseInt(id, 10)});
      if (isMember) {
        userApps.push({
          id: apps[x].id,
          name: apps[x].name,
          role: isMember.role
        });
      }
    }

    return userApps;
  },
  getUserDatasources: function(userId) {
    var self = this,
      user = self.getUser(userId),
      userDatasources = [],
      x,
      datasource;

    if (user.userDatasources.length) {
      for (x = 0; x < user.userDatasources.length; x++) {
        datasource = _.find(datasources, {'id': parseInt(user.userDatasources[x], 10)});

        userDatasources.push({
          id: datasource.id,
          bucket_name: datasource.bucket_name
        });
      }
    }

    return userDatasources;
  },
  updateUser: function(userId, formData) {
    var userIndex = _.findIndex(users, {'id': parseInt(userId, 10)});

    users[userIndex].name = formData.name;
    users[userIndex].email = formData.email;
    users[userIndex].github_username = formData.github_username;

    return true;
  },
  newUser: function(formData) {
    var newId = parseInt(users[users.length - 1].id, 10) + 1;

    users.push({
      id: newId,
      name: formData.name,
      email: formData.email,
      github_username: formData.github_username
    });

    return true;
  },
  deleteUser: function(userId) {
    _.remove(users, {'id': parseInt(userId, 10)});

    return true;
  }
};

module.exports = userTools;
