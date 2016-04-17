"use strict";
const convolve5x5 = require("./convolve5x5");

module.exports = function sharpen5x5(src, options) {
    const a = options.strength;

    return convolve5x5(src, {
        kernel: [
            [a, a,     a,      a, a],
            [a, a,     a,      a, a],
            [a, a, 1 - a * 24, a, a],
            [a, a,     a,      a, a],
            [a, a,     a,      a, a]
        ],
        clamp: true
    });
};