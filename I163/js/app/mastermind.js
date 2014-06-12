define(['levenshtein', 'app/array-sample'], function (levenshtein) {
  return function Mastermind(dictionary, difficulty) {

    this.triedWords = [];
    this.words = [];
    this.answer;

    this.attempts = 4;
    this.solved = false;

    (function () {
      var n = (difficulty * 2) + 3;
      var nCharWords = dictionary.filter(function (word) {
        return word.length === n;
      });

      this.answer = nCharWords.randomElement();
      this.words = nCharWords.filter(function (word) {
        var distance = levenshtein(word, this.answer);
        return distance > 0 && distance < 5;
      }.bind(this)).randomSample(15);

      this.words.splice(this.words.randomIndex(), 0, this.answer);
    }).bind(this)();

    this.attempt = function (selectedWord) {
      if (this.attempts > 0) {
        if (selectedWord === this.answer) {
          this.solved = true;
        } else {
          var sameChars = 0;
          for (var i = 0; i < selectedWord.length; i++) {
            if (this.answer[i] && selectedWord[i] && this.answer[i] === selectedWord[i]) {
              sameChars++;
            }
          }
          this.triedWords.push({
            word: selectedWord,
            similarity: sameChars
          });
          this.words.splice(this.words.indexOf(selectedWord), 1);
          this.attempts--;
        }
      }
    }
  };
});