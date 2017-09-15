'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
  stringTools = require('../modules/string-tools'),
  randomTools = require('../modules/random-tools'),
  constants = require('../constants.json'),
  init,
  makeDataSource,
  writeFile,
  bucketNameParts = {
    envs: ['alpha', 'beta', 'dev', 'prod'],
    teams: ['laa', 'laa-mi', 'moj', 'moj-analytics', 'test', 'digital-test', 'crest'],
    suffixes: ['team', 'source', 'scratch', 'fact', 'filtered']
  };

init = function() {
  var datasources = [],
    x;

  for (x = 0; x < constants.quantities.NUM_DATA_SOURCES; x += 1) {
    datasources.push(makeDataSource(x));
  }

  console.log(datasources);
  writeFile(datasources);
};

makeDataSource = function (x) {
  var bucketParts = [],
    bucket_name;

  bucketParts.push(randomTools.pickFromArray(bucketNameParts.envs));
  bucketParts.push(randomTools.pickFromArray(bucketNameParts.teams));
  if(randomTools.percentageChance(25)) {
    bucketParts.push(faker.hacker.adjective().replace(/ /i, '-'));
  }
  bucketParts.push(randomTools.pickFromArray(bucketNameParts.suffixes));

  bucket_name = bucketParts.join('-').toLowerCase();

  return {
    id: x,
    bucket_name: bucket_name
  };
};

writeFile = function (data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-datasources.json', JSON.stringify(data, null, 2), 'utf-8');
};

init();
