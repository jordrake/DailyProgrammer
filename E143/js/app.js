'use strict';

requirejs.config({
  urlArgs: "cacheBuster=" + (new Date().getTime()),
  baseUrl: 'js/vendor',
  paths: {
    app: '../app'
  }
});

requirejs(['app/braille'], function (braille) {
  document.getElementById('decode').onclick= function (e) {
    var input = document.getElementById('brailleIn').value;
    document.getElementById('decoded').innerHTML = braille.toEnglish(input);
  };
});