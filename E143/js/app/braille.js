define(function () {
  return {
    toEnglish: function (brailleString) {
      return this.stringToChars(brailleString).map(function (char) {
        return this.dictionary[char];
      }.bind(this)).join("");
    },

    stringToChars: function (brailleString) {
      var rows = brailleString.split("\n").map(function (row) {
        return row.split(" ");
      });

      var chars = [];
      for (var i = 0; i < rows[0].length; i++) {
        chars[i] = rows[0][i] + rows[1][i] + rows[2][i];
      }

      return chars;
    },

    dictionary: {
      "O.....": 'a',
      "O.O...": 'b',
      "OO....": 'c',
      "OO.O..": 'd',
      "O..O..": 'e',
      "OOO...": 'f',
      "OOOO..": 'g',
      "O.OO..": 'h',
      ".OO...": 'i',
      ".OOO..": 'j',
      "O...O.": 'k',
      "O.O.O.": 'l',
      "OO..O.": 'm',
      "OO.OO.": 'n',
      "O..OO.": 'o',
      "OOO.O.": 'p',
      "OOOOO.": 'q',
      "O.OOO.": 'r',
      ".OO.O.": 's',
      ".OOOO.": 't',
      "O...OO": 'u',
      "O.O.OO": 'v',
      ".OOO.O": 'w',
      "OO..OO": 'x',
      "OO.OOO": 'y',
      "O..OOO": 'z'
    }
  };
});