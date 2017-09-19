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
  getDatasourceUsers: function(id) {
    var datasourceUsers = [],
      x;

    for (x = 0; x < users.length; x += 1) {
      if (users[x].userDatasources.indexOf(parseInt(id, 10)) !== -1) {
        datasourceUsers.push(users[x]);
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
      bucket_name: formData.bucket_name,
      bucket_url: formData.bucket_url
    });

    return true;
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
  deleteDatasource: function(datasourceId) {
    var self = this,
      datasourceApps = self.getDatasourceApps(datasourceId),
      x,
      app,
      appIndex,
      appDatasources;

    _.remove(datasources, {'id': parseInt(datasourceId, 10)});

    for (x = 0; x < datasourceApps.length; x += 1) {
      app = _.find(apps, {'id': parseInt(datasourceApps[x].id, 10)});
      appIndex = _.findIndex(apps, {'id': parseInt(datasourceApps[x].id, 10)});
      appDatasources = app.datasources;
      _.pull(appDatasources, parseInt(datasourceId, 10));
      apps[appIndex].datasources = appDatasources;
    }

    return true;
  }
};

module.exports = datasourceTools;
