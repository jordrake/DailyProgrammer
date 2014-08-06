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
    } while (difficulty < 1 || difficulty > 5 || !difficulty)
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

  var gameLoop = function (mmInstance) {
    console.log(mmInstance);
    document.getElementById('attempts').textContent = mmInstance.attempts + " attempt(s) left";

    drawList(
      document.getElementById('passwords'),
      mmInstance.words,
      function (item, li) {
        li.textContent = item;
        li.onclick = function () {
          mmInstance.attempt(this.textContent);
          gameLoop(mmInstance);
        };
      }
    );

    drawList(
      document.getElementById('tried-words'),
      mmInstance.triedWords,
      function (item, li) {
        li.textContent = item.word + " - " + item.similarity;
      }
    );

    if (mmInstance.solved || mmInstance.attempts === 0) {
      var choice = (mmInstance.solved ? window.confirm("You have hacked the system. The password was " + mmInstance.answer + ". Would you like to play again?") : window.confirm("You have been annihilated. The password was " + mmInstance.answer + ". Would you like to try again?"));
      if(choice) {
        gameLoop(new Mastermind(dictionary, difficultyPrompt()));
      }
    }
  };

  gameLoop(new Mastermind(dictionary, difficultyPrompt()));
});