'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
  stringTools = require('../modules/string-tools'),
  constants = require('../constants.json'),
  init,
  makeDataSource,
  writeFile;

init = function() {
  var dataSources = [],
    x;

  for (x = 0; x < constants.quantities.NUM_DATA_SOURCES; x += 1) {
    dataSources.push(makeDataSource(x));
  }

  // console.log(dataSources);
  writeFile(dataSources);
};

makeDataSource = function (x) {
  var bucket_name = stringTools.titleCase([faker.company.bs(), faker.company.bsNoun()].join(' ')),
    bucket_url = 'http://s3-eu-west-1.amazonaws.com/' + bucket_name.toLowerCase().replace(/ /gi, '_');

  return {
    id: x,
    bucket_name: bucket_name,
    bucket_url: bucket_url
  };
};

writeFile = function (data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-data-sources.json', JSON.stringify(data, null, 2), 'utf-8');
};

init();
