var path = require('path');
var fs = require('fs');
var faker = require('faker');
var mkdirp = require('mkdirp');
var stringTools = require('./app/modules/string-tools');
var randomTools = require('./app/modules/random-tools');
var constants = require('./app/constants.json');

var groupSuffixes = ["Group", "Team", "Project", "Service", "Product"];

function init() {
  var groups = [];

  for(var x = 0; x < constants.quantities.NUM_GROUPS; x += 1) {
    groups.push(makeGroup(x));
  }

  console.log(groups);
  writeFile(groups);
}

function makeGroup(x) {
  var id = x + 1;
  var name = stringTools.titleCase([faker.name.jobArea(), faker.commerce.productAdjective(), faker.name.jobDescriptor(), pickGroupSuffix()].join(' '));

  return {
    id: id,
    name: name
  };
}

function pickGroupSuffix() {
  return randomTools.pickFromArray(groupSuffixes);
}

function writeFile(data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-groups.json', JSON.stringify(data, null, 2), 'utf-8');
}



init();
