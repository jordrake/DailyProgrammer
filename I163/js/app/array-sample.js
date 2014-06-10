define(function () {

  Array.prototype.randomIndex = function () {
    return Math.floor(Math.random() * this.length);
  };

  Array.prototype.randomElement = function () {
    return this[this.randomIndex()];
  };

  Array.prototype.randomSample = function (n) {
    var sample = [];
    for(var i=0; i < n; i++) {
      do {
        var randomElement = this.randomElement();
      } while (sample.indexOf(randomElement) > -1 )
      sample.push(randomElement);
    }
    return sample;
  };

});