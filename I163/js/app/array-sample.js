define(function () {

  Array.prototype.randomSample = function (n) {
    var sample = [];
    for(var i=0; i < n; i++) {
      do {
        var randomElement = this[Math.floor(Math.random() * this.length)];
      } while (sample.indexOf(randomElement) > -1 )
      sample.push(randomElement);
    }
    return sample;
  };

});