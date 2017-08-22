'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
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
    github_username = [firstName, lastName].join('-').toLowerCase() + Math.floor(Math.random() * 1000).toString().replace(/ /gi, '');

  return {
    id: x,
    name: name,
    email: email,
    github_username: github_username
  };
};

writeFile = function (data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-users.json', JSON.stringify(data, null, 2), 'utf-8');
};

init();
