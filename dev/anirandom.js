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

    anirandom = function (elt, args) {
        var parameters = extend({
                backgroundColor: '#000',
                dotColor: '#fff',
                dotSize: 1,
                dotRadius: 1,
                limit: 1000,
                animation: 'cubic-bezier(.44,0,1,0)'
            }, args),
            bg = document.querySelectorAll(elt),
            animateDots,
            SCREEN_WIDTH = window.innerWidth - parameters.dotSize,
            SCREEN_HEIGHT = window.innerHeight - parameters.dotSize;

        animateDots = function () {
            var dots = document.querySelectorAll('.dot');

            Array.prototype.forEach.call(dots, function (dot) {

                window.setInterval(function () {
                    var newPosition = randomPosition(SCREEN_WIDTH, SCREEN_HEIGHT);

                    dot.style.top = newPosition.y + 'px';
                    dot.style.left = newPosition.x + 'px';

                }, dot.getAttribute('data-timer'));

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
            dot.style.borderRadius = parameters.dotRadius + 'px';
            dot.style.position = 'absolute';
            dot.classList.add('dot');

            for (i = 0; i < parameters.limit; i += 1) {
                clone = dot.cloneNode(true);
                clonePosition = randomPosition(SCREEN_WIDTH, SCREEN_HEIGHT);

                timer = randomInt(1, 5) * 1000;

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
