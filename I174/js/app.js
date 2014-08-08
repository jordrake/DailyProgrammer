'use strict';

requirejs.config({
    urlArgs: "cacheBuster=" + (new Date().getTime()),
    baseUrl: 'js/vendor',
    paths: {
        app: '../app'
    }
});

requirejs(['md5'], function (md5) {

    var page = {
        avatar: document.querySelector('#avatar'),
        username: document.querySelector('#username-input')
    };

    var generateBinaryRows = function (username) {
        var language = "0123456789abcdef".split('');
        var md5Chars = md5(username).split('');
        var binaryCodes = [];
        for (var i = 0; i < md5Chars.length; i += 2) {
            binaryCodes.push(
                    language.indexOf(md5Chars[i]).toString(2) +
                    language.indexOf(md5Chars[i + 1]).toString(2)
            );
        }
        return binaryCodes;
    };

    var drawAvatar = function (binaryCodes, colors) {
        var avatarCtx = page.avatar.getContext('2d');
        var px = 8;

        avatarCtx.clearRect(0, 0, page.avatar.height, page.avatar.width);

        avatarCtx.fillStyle = "black";

        for (var y = 0; y < binaryCodes.length; y++) {
            for (var x = 0; x < 8; x++) {

                if (binaryCodes[y][x] === '1') {
                    avatarCtx.fillRect(x * px, y * px, px, px);
                    avatarCtx.fillRect(page.avatar.width - (x * px), y * px, -px, px);
                }
            }
        }

    };

    page.username.addEventListener('keyup', function () {
        drawAvatar(generateBinaryRows(page.username.value));
    }, false);
});