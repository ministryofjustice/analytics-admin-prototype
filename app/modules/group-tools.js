'use strict';
var _ = require('lodash'),
  constants = require('../constants.json'),
  randomTools = require('../modules/random-tools.js'),
  arrayTools = require('../modules/array-tools.js'),
  userTools = require('../modules/user-tools.js'),
  groups = require('../assets/data/dummy-groups.json'),
  apps = require('../assets/data/dummy-apps.json');

var groupTools = {
  addMembers: function() { // add members to newly generated group
    var x,
      groupMembers = [],
      numMembers = Math.floor(Math.random() * constants.quantities.MAX_GROUP_MEMBERS) + 1;

    for (x = 0; x < numMembers; x += 1) {
      groupMembers.push({
        id: randomTools.getRandom(constants.quantities.NUM_USERS),
        role: (randomTools.percentageChance(7) ? 1 : 0)
      });
    }

    groupMembers = _.uniqBy(groupMembers, 'id');
    groupMembers = _.sortBy(groupMembers, 'id');
    groupMembers[0].role = 1;

    return groupMembers;
  },
  addApps: function() { // add apps to newly generated group
    var x,
      groupApps = [],
      numApps = Math.floor(Math.random() * constants.quantities.MAX_GROUP_APPS) + 1;

    for (x = 0; x < numApps; x += 1) {
      groupApps.push(Math.floor(Math.random() * constants.quantities.NUM_APPS));
    }

    groupApps = _.uniq(arrayTools.sort(groupApps));

    return groupApps;
  },
  newMember: function(groupId, memberId) { // add member to group in memory only
    var self = this,
      group = self.getGroup(groupId),
      groupIndex = _.findIndex(groups, {'id': parseInt(groupId, 10)}),
      members = group.members;

    members.push({
      id: parseInt(memberId, 10),
      role: 0
    });
    members = _.sortBy(members, 'id');
    groups[groupIndex].members = members;

    return true;
  },
  deleteMember: function(groupId, memberId) { // remove member from group in memory
    var self = this,
      group = self.getGroup(groupId),
      groupIndex = _.findIndex(groups, {'id': parseInt(groupId, 10)}),
      members = group.members,
      member = _.find(members, {'id': parseInt(memberId, 10)}),
      memberIndex = _.findIndex(members, {'id': parseInt(memberId, 10)}),
      numAdmins = _.filter(members, {'role': 1}).length;

    if (memberIndex === -1 || members.length === 1 || (numAdmins === 1 && member.role === 1)) {
      return false; // got to have at least one admin member
    }

    _.remove(members, {'id': parseInt(memberId, 10)});
    groups[groupIndex].members = members;

    return true;
  },
  toggleAdminRole: function(groupId, memberId) {
    var self = this,
      group = self.getGroup(groupId),
      groupIndex = _.findIndex(groups, {'id': parseInt(groupId, 10)}),
      members = group.members,
      member = _.find(members, {'id': parseInt(memberId, 10)}),
      memberIndex = _.findIndex(members, {'id': parseInt(memberId, 10)}),
      numAdmins = _.filter(members, {'role': 1}).length,
      newRole = Math.abs(parseInt(member.role, 10) - 1);

    if (newRole === 0 && numAdmins <= 1) {
      return false; // can't have no admins in group
    }

    groups[groupIndex].members[memberIndex].role = newRole;

    return true;
  },
  newApp: function(groupId, appId) { // add app to group in memory only
    var self = this,
      group = self.getGroup(groupId),
      groupIndex = _.findIndex(groups, {'id': parseInt(groupId, 10)}),
      apps = group.apps;

    apps.push(parseInt(appId, 10));
    apps = _.sortBy(apps, 'id');
    groups[groupIndex].apps = apps;

    return true;
  },
  deleteApp: function(groupId, appId) { // remove app from group in memory
    var self = this,
      group = self.getGroup(groupId),
      groupIndex = _.findIndex(groups, {'id': parseInt(groupId, 10)}),
      apps = group.apps;

    _.pull(apps, parseInt(appId, 10));
    groups[groupIndex].apps = apps;

    return true;
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
      member = userTools.getUser(group.members[x].id);
      member.role = group.members[x].role;
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
