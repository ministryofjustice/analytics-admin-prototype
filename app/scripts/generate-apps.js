'use strict';

var fs = require('fs'),
  faker = require('faker'),
  mkdirp = require('mkdirp'),
  randomTools = require('../modules/random-tools'),
  stringTools = require('../modules/string-tools'),
  appTools = require('../modules/app-tools'),
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
    repoUrl = constants.urls.GITHUB_ORG_BASE + slug,
    datasources = appTools.addDatasources(),
    appGroup = [
      {
        id: Math.floor(Math.random() * constants.quantities.NUM_USERS),
        role: 0
      }
    ];

  return {
    id: x,
    name: name,
    description: description,
    slug: slug,
    repoUrl: repoUrl,
    datasources: datasources,
    appGroup: appGroup
  };
};

writeFile = function (data) {
  mkdirp('./app/assets/data/');
  fs.writeFile('./app/assets/data/dummy-apps.json', JSON.stringify(data, null, 2), 'utf-8');
};

init();
