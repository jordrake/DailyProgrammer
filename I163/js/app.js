'use strict';

requirejs.config({
  urlArgs: "cacheBuster=" + (new Date().getTime()),
  baseUrl: 'js/vendor',
  paths: {
    app: '../app'
  }
});

requirejs(['app/oxford', 'app/mastermind'], function (oxford, Mastermind) {
  var dictionary = oxford.create('resources/enable1.txt');

  var difficultyPrompt = function () {
    do {
      var difficulty = window.prompt("Choose a difficulty level from 1-5");
    } while (difficulty < 1 || difficulty > 5)
    return difficulty;
  };

  var drawList = function (list, items, cb) {
    list.innerHTML = null;
    var fragment = document.createDocumentFragment();
    items.forEach(function (item) {
      var itemHtml = document.createElement('li');
      cb(item, itemHtml);
      fragment.appendChild(itemHtml);
    });
    list.appendChild(fragment);
  };

  var gameLoop = function () {
    document.getElementById('attempts').textContent = mm.attempts + " attempt(s) left";

    drawList(
      document.getElementById('passwords'),
      mm.words,
      function (item, li) {
        li.textContent = item;
        li.onclick = function () {
          mm.attempt(this.textContent);
          gameLoop();
        };
      }
    );

    drawList(
      document.getElementById('tried-words'),
      mm.triedWords,
      function (item, li) {
        li.textContent = item.word + " - " + item.similarity;
      }
    );

    if (mm.solved || mm.attempts === 0) {
      var choice = (mm.solved ? window.confirm("You have hacked the system. The password was " + mm.answer + ". Would you like to play again?") : window.confirm("You have been annihilated. The password was " + mm.answer + ". Would you like to try again?"));
      if (!choice) {
        alert("Tough luck!");
      }
      mm = new Mastermind(dictionary, difficultyPrompt());
      gameLoop();
    }
  };

  var mm = new Mastermind(dictionary, difficultyPrompt());
  gameLoop();

});