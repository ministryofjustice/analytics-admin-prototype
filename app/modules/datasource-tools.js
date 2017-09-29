'use strict';
var _ = require('lodash'),
  arrayTools = require('../modules/array-tools.js'),
  datasources = require('../assets/data/dummy-datasources.json'),
  apps = require('../assets/data/dummy-apps.json'),
  users = require('../assets/data/dummy-users.json');

var datasourceTools = {
  getDatasource: function(id) {
    return _.find(datasources, {'id': parseInt(id, 10)});
  },
  getDatasourceApps: function(id) {
    var datasourceApps = [],
      x;

    for (x = 0; x < apps.length; x += 1) {
      if (apps[x].datasources.indexOf(parseInt(id, 10)) !== -1) {
        datasourceApps.push(apps[x]);
      }
    }

    return datasourceApps;
  },
  getDatasourceUsers: function(datasourceId) {
    var datasourceUsers = [],
      x,
      match,
      matchedUser;

    for (x = 0; x < users.length; x += 1) {
      match = _.find(users[x].userDatasources, {'id': parseInt(datasourceId, 10)});
      if (match) {
        matchedUser = users[x];
        matchedUser.role = match.role;
        datasourceUsers.push(matchedUser);
      }
    }

    return datasourceUsers;
  },
  updateDatasource: function(datasourceId, formData) {
    var datasourceIndex = _.findIndex(datasources, {'id': parseInt(datasourceId, 10)});

    datasources[datasourceIndex].bucket_name = formData.bucket_name;
    datasources[datasourceIndex].bucket_url = formData.bucket_url;

    return true;
  },
  newDatasource: function(formData) {
    var newId = parseInt(datasources[datasources.length - 1].id, 10) + 1;

    datasources.push({
      id: newId,
      bucket_name: formData.bucket_name
    });

    return newId;
  },
  getAppsWithoutDatasource: function(datasourceId) {
    var appsWithoutDatasource = [],
      x;

    for (x = 0; x < apps.length; x += 1) {
      if (!apps[x].datasources.includes(parseInt(datasourceId, 10))) {
        appsWithoutDatasource.push({
          id: apps[x].id,
          name: apps[x].name
        });
      }
    }

    return appsWithoutDatasource;
  },
  getUsersWithoutDatasource: function(datasourceId) {
    var usersWithoutDatasource = [],
      x;

    for (x = 0; x < users.length; x += 1) {
      if (!users[x].userDatasources.includes(parseInt(datasourceId, 10))) {
        usersWithoutDatasource.push({
          id: users[x].id,
          name: users[x].name
        });
      }
    }

    return usersWithoutDatasource;
  },
  addDatasourceToApp: function(datasourceId, formData) {
    var appId = parseInt(formData['add-datasource-to-app'], 10),
      app = _.find(apps, {'id': appId}),
      appIndex = _.findIndex(apps, {'id': appId}),
      datasources = app.datasources;

    datasources.push(parseInt(datasourceId, 10));
    datasources = arrayTools.sort(datasources);
    apps[appIndex].datasources = datasources;

    return true;
  },
  addDatasourceToUser: function(datasourceId, formData, makeAdmin) {
    var userId = parseInt(formData['add-datasource-to-user'], 10),
      user = _.find(users, {'id': userId}),
      userIndex = _.findIndex(users, {'id': userId}),
      datasources = user.userDatasources,
      role = (makeAdmin ? 0 : 1);

    datasources.push({
      id: parseInt(datasourceId, 10),
      role: role
    });
    datasources = _.sortBy(datasources, 'id');
    users[userIndex].userDatasources = datasources;

    return true;
  },
  removeDatasourceUser: function(datasourceId, userId) {
    var user = _.find(users, {'id': parseInt(userId, 10)}),
      userIndex = _.findIndex(users, {'id': parseInt(userId, 10)}),
      datasources = user.userDatasources;

    datasources = _.pull(datasources, parseInt(datasourceId, 10));
    users[userIndex].userDatasources = datasources;

    return true;
  },
  removeDatasourceApp: function(datasourceId, appId) {
    var app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(apps, {'id': parseInt(appId, 10)}),
      datasources = app.datasources;

    datasources = _.pull(datasources, parseInt(datasourceId, 10));
    apps[appIndex].datasources = datasources;

    return true;
  },
  deleteDatasource: function(datasourceId) {
    var self = this,
      datasourceApps = self.getDatasourceApps(datasourceId),
      datasourceUsers = self.getDatasourceUsers(datasourceId),
      x,
      app,
      appIndex,
      appDatasources,
      user,
      userIndex,
      userDatasources;

    _.remove(datasources, {'id': parseInt(datasourceId, 10)});

    for (x = 0; x < datasourceApps.length; x += 1) {
      app = _.find(apps, {'id': parseInt(datasourceApps[x].id, 10)});
      appIndex = _.findIndex(apps, {'id': parseInt(datasourceApps[x].id, 10)});
      appDatasources = app.datasources;
      _.pull(appDatasources, parseInt(datasourceId, 10));
      apps[appIndex].datasources = appDatasources;
    }

    for (x = 0; x < datasourceUsers.length; x += 1) {
      user = _.find(users, {'id': parseInt(datasourceUsers[x].id, 10)});
      userIndex = _.findIndex(users, {'id': parseInt(datasourceUsers[x].id, 10)});
      userDatasources = user.userDatasources;
      userDatasources = _.reject(userDatasources, {'id': parseInt(datasourceId, 10)});
      users[userIndex].userDatasources = userDatasources;
    }

    return true;
  }
};

module.exports = datasourceTools;
