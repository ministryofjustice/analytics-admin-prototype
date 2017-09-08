'use strict';

var _ = require('lodash'),
  groups = require('../assets/data/dummy-groups.json'),
  users = require('../assets/data/dummy-users.json');

var userTools = {
  getUser: function(id) {
    return _.find(users, {'id': parseInt(id, 10)});
  },
  getUserGroups: function(id) {
    var x,
      y,
      group,
      userGroups = [];

    for (x = 0; x < groups.length; x += 1) {
      group = groups[x];
      for (y = 0; y < group.members.length; y += 1) {
        if (group.members[y].id === parseInt(id, 10)) {
          userGroups.push({
            id: group.id,
            name: group.name,
            memberRole: group.members[y].role
          });
        }
      }
    }

    return userGroups;
  },
  checkGroupForUser: function(userId, group) {
    if (_.find(group.members, {'id': parseInt(userId, 10)})) {
      return true;
    }
    return false;
  },
  getGroupsWithoutUser: function(userId) { // that's a horrid function name
    var self = this,
      groupsWithoutUser = [],
      x;

    for (x = 0; x < groups.length; x += 1) {
      if (!self.checkGroupForUser(userId, groups[x])) {
        groupsWithoutUser.push({
          id: groups[x].id,
          name: groups[x].name
        });
      }
    }

    return groupsWithoutUser;
  },
  updateUser: function(userId, formData) {
    var userIndex = _.findIndex(users, {'id': parseInt(userId, 10)});

    users[userIndex].name = formData.name;
    users[userIndex].email = formData.email;
    users[userIndex].github_username = formData.github_username;

    return true;
  },
  newUser: function(formData) {
    var newId = parseInt(users[users.length - 1].id, 10) + 1;

    users.push({
      id: newId,
      name: formData.name,
      email: formData.email,
      github_username: formData.github_username
    });

    return true;
  },
  deleteUser: function(userId) {
    var self = this,
      userGroups = self.getUserGroups(userId),
      x,
      group,
      groupIndex,
      numAdmins,
      members;

    for (x = 0; x < userGroups.length; x += 1) {
      group = _.find(groups, {'id': parseInt(userGroups[x].id, 10)});
      numAdmins = _.filter(group.members, {'role': 1}).length;
      if (numAdmins === 1 && parseInt(userGroups[x].memberRole, 10) === 1) {
        return false;
      }
    }

    _.remove(users, {'id': parseInt(userId, 10)});

    for (x = 0; x < userGroups.length; x += 1) {
      group = _.find(groups, {'id': parseInt(userGroups[x].id, 10)});
      groupIndex = _.findIndex(groups, {'id': parseInt(userGroups[x].id, 10)});
      members = group.members;
      _.remove(members, {'id': parseInt(userId, 10)});
      groups[groupIndex].members = members;
    }

    return true;
  },
  addUserToGroup: function(userId, formData) {
    var groupId = parseInt(formData['add-user-to-group'], 10),
      group = _.find(groups, {'id': groupId}),
      groupIndex = _.findIndex(groups, {'id': groupId}),
      members = group.members;

    members.push({
      id: parseInt(userId, 10),
      role: 0
    });

    members = _.orderBy(members, 'id');
    groups[groupIndex].members = members;

    return true;
  }
};

module.exports = userTools;
