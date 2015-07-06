/*!
 * Project : anirandom
 * File : anirandom.js
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.1.1
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 */
/*global window, document*/
(function (exports) {
    'use strict';

    var extend,
        randomInt,
        randomPosition,
        randomColor,
        anirandom;

    extend = function (out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    randomPosition = function (scr_w, scr_h) {
        return {
            x: randomInt(0, scr_w),
            y: randomInt(0, scr_h)
        };
    };

    randomColor = function () {
        var letters = '0123456789ABCDEF'.split(''),
            color = '#',
            i;
        for (i = 0; i < 6; i += 1) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    anirandom = function (elt, args) {
        var parameters = extend({
                backgroundColor: '#000',
                dotColor: '#fff',
                dotSize: 1,
                dotRadius: 50, // %
                limit: 1500,
                delay: 5, //ms
                delayIncrementation: 1, //ms
                timerMin: 1500,
                timerMax: 2000, //ms
                animation: 'linear'
            }, args),
            bg = document.querySelectorAll(elt),
            animateDots,
            bubble,
            SCREEN_WIDTH = window.innerWidth - parameters.dotSize,
            SCREEN_HEIGHT = window.innerHeight - parameters.dotSize;

        bubble = function (dot) {
            dot.style.background = randomColor();

            window.setTimeout(function () {
                dot.style.background = parameters.dotColor;
            }, dot.getAttribute('data-timer'));
        };

        animateDots = function () {
            var dots = document.querySelectorAll('.dot');

            Array.prototype.forEach.call(dots, function (dot) {

                window.setTimeout(function () {
                    window.setInterval(function () {
                        var newPosition = randomPosition(SCREEN_WIDTH, SCREEN_HEIGHT);

                        dot.style.top = newPosition.y + 'px';
                        dot.style.left = newPosition.x + 'px';

                        //if (randomInt(0, 1000) <= 500) {
                            bubble(dot);
                        //}

                    }, dot.getAttribute('data-timer'));
                }, parameters.delay);

                parameters.delay += parameters.delayIncrementation;
            });
        };

        Array.prototype.forEach.call(bg, function (background) {
            var dot = document.createElement('div'),
                clone,
                clonePosition,
                timer,
                i;

            background.style.position = 'relative';
            background.style.width = 100 + '%';
            background.style.height = 100 + '%';
            background.style.backgroundColor = parameters.backgroundColor;

            dot.style.height = parameters.dotSize + 'px';
            dot.style.width = parameters.dotSize + 'px';
            dot.style.backgroundColor = parameters.dotColor;
            dot.style.borderRadius = parameters.dotRadius + '%';
            dot.style.position = 'absolute';
            dot.classList.add('dot');

            for (i = 0; i < parameters.limit; i += 1) {
                clone = dot.cloneNode(true);
                clonePosition = randomPosition(SCREEN_WIDTH, SCREEN_HEIGHT);

                timer = randomInt(parameters.timerMin, parameters.timerMax);

                clone.style.top = clonePosition.y + 'px';
                clone.style.left = clonePosition.x + 'px';
                clone.dataset.timer = timer;
                clone.style.transition = timer + 'ms ' + parameters.animation + ' all';

                background.appendChild(clone);

                if (i === (parameters.limit - 1)) {
                    animateDots();
                }
            }
        });
    };

    exports.anirandom = anirandom;
}(window));

/*global $, jQuery, anirandom*/
if (window.jQuery) {
    (function ($, anirandom) {
        'use strict';

        function anirandomify(el, options) {
            anirandom(el, options);
        }

        $.fn.anirandom = function (options) {
            return anirandomify(this.selector, options);
        };
    }(jQuery, anirandom));
}
