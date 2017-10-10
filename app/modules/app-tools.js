'use strict';

var _ = require('lodash'),
  constants = require('../constants.json'),
  arrayTools = require('../modules/array-tools.js'),
  datasourceTools = require('../modules/datasource-tools.js'),
  apps = require('../assets/data/dummy-apps.json'),
  users = require('../assets/data/dummy-users.json'),
  datasources = require('../assets/data/dummy-datasources.json');

var appTools = {
  getApp: function(id) {
    return _.find(apps, {'id': parseInt(id, 10)});
  },
  addDatasources: function() {
    var datasources = [],
      hasDataSources = (Math.random() > 0.1 ? true : false),
      numSources = Math.round(Math.random()) + 1,
      x;

    if (hasDataSources) {
      for (x = 0; x < numSources; x += 1) {
        datasources.push(Math.floor(Math.random() * constants.quantities.NUM_DATA_SOURCES));
      }

      datasources = _.uniq(arrayTools.sort(datasources));
    }

    return datasources;
  },
  getAppGroup: function(id) {
    var self = this,
      app = self.getApp(id),
      appGroup = app.appGroup,
      x,
      user;

    for (x = 0; x < appGroup.length; x += 1) {
      user = _.find(users, {'id': parseInt(appGroup[x].id, 10)});
      appGroup[x].name = user.name;
    }

    return appGroup;
  },
  getUsersNotInAppGroup: function(id) {
    var self = this,
      app = self.getApp(id),
      appGroup = app.appGroup,
      x,
      usersNotInAppGroup = [];

    for (x = 0; x < users.length; x += 1) {
      if (_.findIndex(appGroup, {'id': users[x].id}) === -1) {
        usersNotInAppGroup.push({
          id: users[x].id,
          name: users[x].name
        });
      }
    }

    return usersNotInAppGroup;
  },
  getAppDatasources: function(id) {
    var self = this,
      x,
      app = self.getApp(id),
      appDatasources = [];

    for (x = 0; x < app.datasources.length; x += 1) {
      appDatasources.push(_.find(datasources, {'id': parseInt(app.datasources[x], 10)}));
    }

    return appDatasources;
  },
  updateApp: function(appId, formData) {
    var appIndex = _.findIndex(apps, {'id': parseInt(appId, 10)});

    apps[appIndex].name = formData.name;
    apps[appIndex].description = formData.description;
    apps[appIndex].repoUrl = formData.repoUrl;

    return true;
  },
  addAppUser: function(appId, formData) {
    var userId = parseInt(formData['add-user'], 10),
      app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(users, {'id': parseInt(appId, 10)}),
      appGroup = app.appGroup;

    appGroup.push({
      id: parseInt(userId, 10),
      role: 1
    });
    apps[appIndex].appGroup = _.sortBy(appGroup, 'id');

    return true;
  },
  removeAppUser: function(appId, userId) {
    var app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(users, {'id': parseInt(appId, 10)}),
      appGroup = app.appGroup;

    appGroup = _.reject(appGroup, {'id': parseInt(userId, 10)});
    apps[appIndex].appGroup = appGroup;

    return true;
  },
  toggleUserAdminRole: function(appId, userId) {
    var app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(users, {'id': parseInt(appId, 10)}),
      appGroup = app.appGroup,
      userGroupEntry = _.find(appGroup, {'id': parseInt(userId, 10)}),
      userGroupEntryIndex = _.findIndex(appGroup, {'id': parseInt(userId, 10)});

    userGroupEntry.role = Math.abs(userGroupEntry.role - 1);
    appGroup[userGroupEntryIndex] = userGroupEntry;
    apps[appIndex].appGroup = appGroup;

    return true;
  },
  addAppDatasource: function(appId, formData) {
    var datasourceId = parseInt(formData['add-datasource'], 10),
      app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(apps, {'id': parseInt(appId, 10)}),
      appDatasources = app.datasources;

    appDatasources.push(parseInt(datasourceId, 10));
    apps[appIndex].datasources = arrayTools.sort(appDatasources);

    return true;
  },
  removeAppDatasource: function(appId, datasourceId) {
    var app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(datasources, {'id': parseInt(appId, 10)}),
      appDatasources = app.datasources;

    _.pull(appDatasources, parseInt(datasourceId, 10));
    apps[appIndex].datasources = appDatasources;

    return true;
  },
  newApp: function(formData) {
    var newId = parseInt(apps[apps.length - 1].id, 10) + 1;

    apps.push({
      id: newId,
      name: formData.name,
      description: formData.description,
      repoUrl: formData.repoUrl,
      datasources: [],
      appGroup: []
    });

    return newId;
  },
  deleteApp: function(appId) {
    _.remove(apps, {'id': parseInt(appId, 10)});

    return true;
  },
  createNewApp: function(formData) {
    var self = this,
      newId = self.newApp(formData),
      app,
      datasource = self.getDatasourceFromFormData(formData);

    app = _.find(apps, {'id': newId});
    app.appGroup = [
      {
        id: parseInt(formData.user_id, 10),
        role: 0
      }
    ];
    app.datasources = datasource;

    return true;
  },
  getDatasourceFromFormData: function(formData) {
    var newDatasourceId,
      addToUserObject;

    switch (formData['new-app-datasource']) {
      case 'create':
        newDatasourceId = datasourceTools.newDatasource({
          bucket_name: formData['new-datasource-name']
        });
        addToUserObject = {
          'add-datasource-to-user': parseInt(formData.user_id, 10)
        };

        datasourceTools.addDatasourceToUser(newDatasourceId, addToUserObject, 1);

        return [newDatasourceId];
      case 'select':
        return [formData['select-existing-datasource']];
      default:
        return [];
    }
  }
};

module.exports = appTools;
