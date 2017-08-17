'use strict';

var stringTools = {
  titleCase: function(string) {
    var words = string.split(' '),
      x,
      word,
      newWord;

    for (x = 0; x < words.length; x += 1) {
      word = words[x];
      newWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

      words[x] = newWord;
    }

    return words.join(' ');
  }
};

module.exports = stringTools;
