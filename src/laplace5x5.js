"use strict";
const convolve5x5 = require("./convolve5x5");

module.exports = function laplace5x5(src, options) {
    return convolve5x5(src, {
        kernel: [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, 24, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ],
        mono: true,
        invert: true,
        clamp: true
    });
};