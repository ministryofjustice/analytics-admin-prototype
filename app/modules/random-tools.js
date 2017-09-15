'use strict';

var randomTools = {
  pickFromArray: function(array) {
    var item = array[Math.floor(Math.random() * array.length)];

    return item;
  },
  percentageChance: function(percentage) {
    return (Math.floor(Math.random() > (parseInt(percentage, 10) / 100)) ? false : true);
  },
  getRandom: function(range) {
    return Math.floor(Math.random() * range);
  }
};

module.exports = randomTools;
