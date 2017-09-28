'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
  _ = require('lodash'),
  randomTools = require('../modules/random-tools'),
  constants = require('../constants.json'),
  init,
  makeUser,
  writeFile;

init = function () {
  var users = [],
    x;

  for (x = 0; x < constants.quantities.NUM_USERS; x += 1) {
    users.push(makeUser(x));
  }

  // console.log(users);
  writeFile(users);
};

makeUser = function (id) {
  var firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    name = [firstName, lastName].join(' '),
    email = [firstName, lastName].join('.').toLowerCase() + '@prototype.gov.uk',
    github_username = [firstName, lastName].join('-').toLowerCase() + Math.floor(Math.random() * 1000).toString().replace(/ /gi, ''),
    userDatasources = [],
    x;

  if (randomTools.percentageChance(50)) {
    userDatasources.push(randomTools.getRandom(constants.quantities.NUM_DATA_SOURCES));
  }
  if (randomTools.percentageChance(50)) {
    userDatasources.push(randomTools.getRandom(constants.quantities.NUM_DATA_SOURCES));
  }

  userDatasources = _.uniq(userDatasources);

  for (x = 0; x < userDatasources.length; x += 1) {
    userDatasources[x] = {
      id: userDatasources[x],
      role: randomTools.getRandom(2)
    };
  }

  return {
    id: id,
    name: name,
    email: email,
    github_username: github_username,
    userDatasources: userDatasources
  };
};

writeFile = function (data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-users.json', JSON.stringify(data, null, 2), 'utf-8');
};

init();
