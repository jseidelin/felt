"use strict";
const convolve3x3 = require("./convolve3x3");

module.exports = function laplace3x3(src, options) {
    return convolve3x3(src, {
        kernel: [
            [-1, -1, -1],
            [-1,  8, -1],
            [-1, -1, -1]
        ],
        mono: true,
        invert: true,
        clamp: true
    });
};