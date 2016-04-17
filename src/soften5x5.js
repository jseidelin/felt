"use strict";
const convolve5x5 = require("./convolve5x5");

module.exports = function soften5x5(src, options) {
    const a = 1 / 25;

    return convolve5x5(src, {
        kernel: [
            [a, a, a, a, a],
            [a, a, a, a, a],
            [a, a, a, a, a],
            [a, a, a, a, a],
            [a, a, a, a, a]
        ],
        clamp: true
    });
};