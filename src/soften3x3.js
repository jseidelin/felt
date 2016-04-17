"use strict";
const convolve3x3 = require("./convolve3x3");

module.exports = function soften3x3(src, options) {
    const a = 1 / 9;

    return convolve3x3(src, {
        kernel: [
            [a, a, a],
            [a, a, a],
            [a, a, a]
        ],
        clamp: true
    });
};