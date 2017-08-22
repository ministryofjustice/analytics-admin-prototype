'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
  randomTools = require('../modules/random-tools'),
  stringTools = require('../modules/string-tools'),
  constants = require('../constants.json'),
  init,
  makeApp,
  writeFile;

init = function() {
  var apps = [],
    x;

  for (x = 0; x < constants.quantities.NUM_APPS; x += 1) {
    apps.push(makeApp(x));
  }

  // console.log(apps);
  writeFile(apps);
};

makeApp = function (x) {
  var name = stringTools.titleCase([faker.company.catchPhraseAdjective(), faker.hacker.ingverb(), faker.hacker.noun()].join(' ')),
    description = (randomTools.percentageChance(75) ? faker.lorem.sentences() : ''),
    slug = name.toLowerCase().replace(/ /gi, '-'),
    repo_url = constants.urls.GITHUB_ORG_BASE + slug;

  return {
    id: x,
    name: name,
    description: description,
    slug: slug,
    repo_url: repo_url
  };
};

writeFile = function (data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-apps.json', JSON.stringify(data, null, 2), 'utf-8');
};

init();
