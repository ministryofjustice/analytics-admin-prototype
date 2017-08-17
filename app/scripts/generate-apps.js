'use strict';

var path = require('path');
var fs = require('fs');
var faker = require('faker');
var mkdirp = require('mkdirp');
var randomTools = require('../modules/random-tools');
var stringTools = require('../modules/string-tools');
var constants = require('../constants.json');

function init() {
  var apps = [];

  for(var x = 0; x < constants.quantities.NUM_APPS; x += 1) {
    apps.push(makeApp(x));
  }

  // console.log(apps);
  writeFile(apps);
}

function makeApp(x) {
  var id = x + 1;
  var name = stringTools.titleCase([faker.company.catchPhraseAdjective(), faker.hacker.ingverb(), faker.hacker.noun()].join(' '));
  var description = (randomTools.percentageChance(75) ? faker.lorem.sentences() : '');
  var slug = name.toLowerCase().replace(/ /gi, '-');
  var repo_url = constants.urls.GITHUB_BASE + slug;

  return {
    id: id,
    name: name,
    description: description,
    slug: slug,
    repo_url: repo_url
  };
}

function writeFile(data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-apps.json', JSON.stringify(data, null, 2), 'utf-8');
}



init();
