'use strict';
var _ = require('lodash'),
  constants = require('../constants.json'),
  groups = require('../assets/data/dummy-groups.json'),
  apps = require('../assets/data/dummy-apps.json');

var groupTools = {
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
  }
};

module.exports = groupTools;
