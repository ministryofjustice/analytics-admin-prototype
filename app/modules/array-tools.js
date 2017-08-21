'use strict';

var arrayTools = {
  sort: function(array) {
    return array.sort(function(a, b) {
      return a - b;
    });
  }
};

module.exports = arrayTools;
