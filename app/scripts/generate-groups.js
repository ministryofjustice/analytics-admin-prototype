'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
  stringTools = require('../modules/string-tools'),
  randomTools = require('../modules/random-tools'),
  constants = require('../constants.json'),
  groupSuffixes = ["Group", "Team", "Project", "Service", "Product"],
  init,
  makeGroup,
  pickGroupSuffix,
  writeFile;

init = function () {
  var groups = [],
    x;

  for (x = 0; x < constants.quantities.NUM_GROUPS; x += 1) {
    groups.push(makeGroup(x));
  }

  // console.log(groups);
  writeFile(groups);
};

makeGroup = function (x) {
  var id = x + 1,
    name = stringTools.titleCase([faker.name.jobArea(), faker.commerce.productAdjective(), faker.name.jobDescriptor(), pickGroupSuffix()].join(' '));

  return {
    id: id,
    name: name
  };
};

pickGroupSuffix = function () {
  return randomTools.pickFromArray(groupSuffixes);
};

writeFile = function (data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-groups.json', JSON.stringify(data, null, 2), 'utf-8');
};

init();
