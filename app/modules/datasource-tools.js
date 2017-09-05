'use strict';
var _ = require('lodash'),
  datasources = require('../assets/data/dummy-datasources.json'),
  apps = require('../assets/data/dummy-apps.json');

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
  updateDatasource: function(datasourceId, datasourceObj) {
    var datasourceIndex = _.findIndex(datasources, {'id': parseInt(datasourceId, 10)});

    datasources[datasourceIndex].bucket_name = datasourceObj.bucket_name;
    datasources[datasourceIndex].bucket_url = datasourceObj.bucket_url;

    return true;
  }
};

module.exports = datasourceTools;
