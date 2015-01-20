define(['app/array-sample'], function () {
  return function Mastermind(dictionary, difficulty) {

    this.triedWords = [];
    this.words = [];

    this.attempts = 4;
    this.solved = false;

    var similarity = function (wordA, wordB) {
      var sameChars = 0;
      for (var i = 0; i < wordA.length; i++) {
        if (wordB[i] && wordA[i] && wordB[i] === wordA[i]) {
          sameChars++;
        }
      }
      return sameChars;
    };


    this.attempt = function (selectedWord) {
      if (this.attempts > 0) {
        if (selectedWord === this.answer) {
          this.solved = true;
        } else {
          var sameChars = similarity(selectedWord, this.answer);
          this.triedWords.push({
            word: selectedWord,
            similarity: sameChars
          });
          this.words.splice(this.words.indexOf(selectedWord), 1);
          this.attempts--;
        }
      }
    };

    (function init() {
      var n = (difficulty * 2) + 4;
      var nCharWords = dictionary.filter(function (word) {
        return word.length === n;
      });

      this.answer = nCharWords.randomElement();
      this.words = nCharWords.filter(function (word) {
        var sameChars = similarity(word, this.answer);
        return sameChars > 2 && sameChars < Math.floor(this.answer.length*0.7);
      }.bind(this)).randomSample(15);
      this.words.splice(this.words.randomIndex(), 0, this.answer);
    }).bind(this)();
  };
});
