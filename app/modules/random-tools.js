var randomTools = {
  pickFromArray: function(array) {
    var item = array[Math.floor(Math.random() * array.length)];

    return item;
  }
};

module.exports = randomTools;
