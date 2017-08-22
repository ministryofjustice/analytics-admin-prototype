'use strict';
var _ = require('lodash'),
  constants = require('../constants.json'),
  arrayTools = require('../modules/array-tools.js'),
  userTools = require('../modules/user-tools.js'),
  groups = require('../assets/data/dummy-groups.json'),
  apps = require('../assets/data/dummy-apps.json');

var groupTools = {
  addMembers: function() {
    var x,
      groupMembers = [],
      numMembers = Math.floor(Math.random() * constants.quantities.MAX_GROUP_MEMBERS) + 1;

    for (x = 0; x < numMembers; x += 1) {
      groupMembers.push(Math.floor(Math.random() * constants.quantities.NUM_USERS));
    }

    groupMembers = _.uniq(arrayTools.sort(groupMembers));

    return groupMembers;
  },
  addApps: function() {
    var x,
      groupApps = [],
      numApps = Math.floor(Math.random() * constants.quantities.MAX_GROUP_APPS) + 1;

    for (x = 0; x < numApps; x += 1) {
      groupApps.push(Math.floor(Math.random() * constants.quantities.NUM_APPS));
    }

    groupApps = _.uniq(arrayTools.sort(groupApps));

    return groupApps;
  },
  getGroup: function(id) {
    return _.find(groups, {'id': parseInt(id, 10)});
  },
  getGroupMembers: function(id) {
    var self = this,
      group = self.getGroup(id),
      groupMembers = [],
      x,
      member;

    for (x = 0; x < group.members.length; x += 1) {
      member = userTools.getUser(group.members[x]);
      groupMembers.push(member);
    }

    return groupMembers;
  },
  getGroupApps: function(id) {
    var self = this,
      group = self.getGroup(id),
      groupApps = [],
      x,
      app;

    for (x = 0; x < group.apps.length; x += 1) {
      app = _.find(apps, {'id': parseInt(group.apps[x], 10)});
      groupApps.push(app);
    }

    return groupApps;
  }
};

module.exports = groupTools;
