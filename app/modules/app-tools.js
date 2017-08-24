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
  }
};

module.exports = appTools;
