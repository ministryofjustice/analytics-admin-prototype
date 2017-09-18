'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
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

makeUser = function (x) {
  var firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    name = [firstName, lastName].join(' '),
    email = [firstName, lastName].join('.').toLowerCase() + '@prototype.gov.uk',
    github_username = [firstName, lastName].join('-').toLowerCase() + Math.floor(Math.random() * 1000).toString().replace(/ /gi, ''),
    userDatasources = [];

  if (randomTools.percentageChance(50)) {
    userDatasources.push(randomTools.getRandom(constants.quantities.NUM_DATA_SOURCES));
  }
  if (randomTools.percentageChance(50)) {
    userDatasources.push(randomTools.getRandom(constants.quantities.NUM_DATA_SOURCES));
  }

  return {
    id: x,
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
