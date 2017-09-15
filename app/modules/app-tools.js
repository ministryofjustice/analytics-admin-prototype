'use strict';
var _ = require('lodash'),
  constants = require('../constants.json'),
  arrayTools = require('../modules/array-tools.js'),
  apps = require('../assets/data/dummy-apps.json'),
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
    apps[appIndex].repo_url = formData.repo_url;

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
      repo_url: formData.repo_url,
      datasources: []
    });

    return true;
  },
  deleteApp: function(appId) {
    _.remove(apps, {'id': parseInt(appId, 10)});

    return true;
  }
};

module.exports = appTools;
