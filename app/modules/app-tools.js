'use strict';
var _ = require('lodash'),
  constants = require('../constants.json'),
  arrayTools = require('../modules/array-tools.js'),
  groups = require('../assets/data/dummy-groups.json'),
  apps = require('../assets/data/dummy-apps.json'),
  datasources = require('../assets/data/dummy-datasources.json');

var appTools = {
  getApp: function(id) {
    return _.find(apps, {'id': parseInt(id, 10)});
  },
  getAppGroups: function(id) {
    var x,
      y,
      group,
      appGroups = [];

    for (x = 0; x < constants.quantities.NUM_GROUPS; x += 1) {
      group = groups[x];
      for (y = 0; y < group.apps.length; y += 1) {
        if (group.apps[y] === parseInt(id, 10)) {
          appGroups.push(group);
        }
      }
    }

    return appGroups;
  },
  addDatasources: function() {
    var datasources = [],
      hasDataSources = (Math.random() > 0.1 ? true : false),
      numSources = Math.floor(Math.random() * 4) + 1,
      x;

    if (hasDataSources) {
      for (x = 0; x < numSources; x += 1) {
        datasources.push(Math.floor(Math.random() * constants.quantities.NUM_DATA_SOURCES));
      }

      datasources = _.uniq(arrayTools.sort(datasources));
    }

    return datasources;
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
  updateApp: function(appId, appObj) {
    var appIndex = _.findIndex(apps, {'id': parseInt(appId, 10)});

    apps[appIndex].name = appObj.name;
    apps[appIndex].description = appObj.description;
    apps[appIndex].repo_url = appObj.repo_url;

    return true;
  },
  addAppGroup: function(appId, formData) {
    var groupId = parseInt(formData['add-group'], 10),
      group = _.find(groups, {'id': parseInt(groupId, 10)}),
      groupApps = group.apps;

    groupApps.push(parseInt(appId, 10));
    group.apps = arrayTools.sort(groupApps);

    return true;
  },
  removeAppGroup: function(appId, groupId) {
    var group = _.find(groups, {'id': parseInt(groupId, 10)}),
      groupIndex = _.findIndex(groups, {'id': parseInt(groupId, 10)}),
      groupApps = group.apps;

    _.pull(groupApps, parseInt(appId, 10));
    groups[groupIndex].apps = groupApps;

    return true;
  },
  addAppDatasource: function(appId, formData) {
    var datasourceId = parseInt(formData['add-datasource'], 10),
      app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(datasources, {'id': parseInt(appId, 10)}),
      appDatasources = app.datasources;

    appDatasources.push(parseInt(datasourceId, 10));
    apps[appIndex].datasources = arrayTools.sort(appDatasources);

    return true;
  },
  removeAppDatasource: function(appId, datasourceId) {
    var datasourceId = parseInt(datasourceId, 10),
      app = _.find(apps, {'id': parseInt(appId, 10)}),
      appIndex = _.findIndex(datasources, {'id': parseInt(appId, 10)}),
      appDatasources = app.datasources;

    _.pull(appDatasources, parseInt(datasourceId, 10));
    apps[appIndex].datasources = appDatasources;

    return true;
  },
  addApp: function(appObj) {
    var newId = parseInt(apps[apps.length - 1].id, 10) + 1;

    apps.push({
      id: newId,
      name: appObj.name,
      description: appObj.description,
      repo_url: appObj.repo_url,
      datasources: []
    });

    return true;
  },
  deleteApp: function(appId) {
    var self = this,
      appGroups = self.getAppGroups(appId),
      x,
      group,
      groupIndex,
      groupApps;

    _.remove(apps, {'id': parseInt(appId, 10)});

    for (x = 0; x < appGroups.length; x += 1) {
      group = _.find(groups, {'id': parseInt(appGroups[x].id, 10)});
      groupIndex = _.findIndex(groups, {'id': parseInt(appGroups[x].id, 10)});
      groupApps = group.apps;
      _.pull(groupApps, parseInt(appId, 10));
      groups[groupIndex].apps = groupApps;
    }

    return true;
  }
};

module.exports = appTools;
