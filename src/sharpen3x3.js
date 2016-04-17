"use strict";
const convolve3x3 = require("./convolve3x3");

module.exports = function sharpen3x3(src, options) {
    const a = options.strength;

    return convolve3x3(src, {
        kernel: [
            [a,     a,     a],
            [a, 1 - a * 8, a],
            [a,     a,     a]
        ],
        clamp: true
    });
};