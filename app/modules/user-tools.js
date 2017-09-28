'use strict';

var _ = require('lodash'),
  users = require('../assets/data/dummy-users.json'),
  apps = require('../assets/data/dummy-apps.json'),
  datasources = require('../assets/data/dummy-datasources.json');

var userTools = {
  getUser: function(id) {
    return _.find(users, {'id': parseInt(id, 10)});
  },
  getUserApps: function(id, invert) {
    var userApps = [],
      x,
      appGroup,
      isMember,
      invertGroup = invert || false;

    for (x = 0; x < apps.length; x += 1) {
      appGroup = apps[x].appGroup;

      isMember = _.find(appGroup, {'id': parseInt(id, 10)});
      if (invertGroup) {
        isMember = !isMember;
      }
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
  getAppsNotAvailableToUser: function(id) {
    return this.getUserApps(id, true);
  },
  getUserDatasources: function(userId) {
    var self = this,
      user = self.getUser(userId),
      userDatasources = [],
      x,
      datasource;

    if (user && user.userDatasources.length) {
      for (x = 0; x < user.userDatasources.length; x += 1) {
        datasource = _.find(datasources, {'id': parseInt(user.userDatasources[x].id, 10)});

        userDatasources.push({
          id: datasource.id,
          role: user.userDatasources[x].role,
          bucket_name: datasource.bucket_name
        });
      }
    }

    return userDatasources;
  },
  getDatasourcesNotAvailableToUser: function(userId) {
    var self = this,
      user = self.getUser(userId),
      userDatasources = user.userDatasources,
      x,
      datasourcesNotAvailableToUser = [];

    for (x = 0; x < datasources.length; x += 1) {
      if (!_.find(userDatasources, {'id': parseInt(datasources[x].id, 10)})) {
        datasourcesNotAvailableToUser.push(datasources[x]);
      }
    }

    return datasourcesNotAvailableToUser;
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
  },
  addUserToApp: function(userId, formData) {
    var appId = parseInt(formData['add-user-to-app'], 10),
      app = _.find(apps, {'id': appId}),
      appIndex = _.findIndex(apps, {'id': appId}),
      appGroup = app.appGroup;

    appGroup.push({
      id: parseInt(userId, 10),
      role: 1
    });

    apps[appIndex].appGroup = _.sortBy(appGroup, 'id');

    return true;
  },
  removeUserFromApp: function(userId, appId) {
    var app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(apps, {'id': parseInt(appId, 10)}),
      appGroup = app.appGroup;

    appGroup = _.reject(appGroup, {'id': parseInt(userId, 10)});
    apps[appIndex].appGroup = appGroup;

    return true;
  },
  addDatasourceToUser: function(userId, formData) {
    var self = this,
      datasourceId = parseInt(formData['add-datasource-to-user'], 10),
      user = self.getUser(userId),
      userIndex = _.findIndex(users, {'id': parseInt(userId, 10)}),
      datasources = user.userDatasources;

    datasources.push({
      id: datasourceId,
      role: 1
    });
    users[userIndex].userDatasources = _.sortBy(datasources, 'id');

    return true;
  },
  removeDatasourceFromUser: function(userId, datasourceId) {
    var self = this,
      user = self.getUser(userId),
      userIndex = _.findIndex(users, {'id': parseInt(userId, 10)}),
      userDatasources = user.userDatasources;

    userDatasources = _.reject(userDatasources, {'id': parseInt(datasourceId, 10)});
    users[userIndex].userDatasources = userDatasources;

    return true;
  },
  toggleDatasourceAdminRole: function(datasourceId, userId) {
    var self = this,
      user = self.getUser(userId),
      userIndex = _.findIndex(users, {'id': parseInt(userId, 10)}),
      userDatasources = user.userDatasources,
      userDatasourceEntry = _.find(userDatasources, {'id': parseInt(datasourceId, 10)}),
      userDatasourceEntryIndex = _.findIndex(userDatasources, {'id': parseInt(datasourceId, 10)});

    userDatasourceEntry.role = Math.abs(userDatasourceEntry.role - 1);
    userDatasources[userDatasourceEntryIndex] = userDatasourceEntry;
    users[userIndex].userDatasources = userDatasources;

    return true;
  }
};

module.exports = userTools;
