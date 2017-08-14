var stringTools = {
  titleCase: function(string) {
    var words = string.split(' ');

    for(var x = 0; x < words.length; x += 1) {
      var word = words[x];
      var newWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      words[x] = newWord;
    }

    return words.join(' ');
  }
};

module.exports = stringTools;
