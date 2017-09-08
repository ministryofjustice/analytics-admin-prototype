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
  }
};

module.exports = datasourceTools;
