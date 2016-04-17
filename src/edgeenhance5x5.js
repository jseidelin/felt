"use strict";
const convolve5x5 = require("./convolve5x5");

module.exports = function edgeenhance5x5(src, options) {
    return convolve5x5(src, {
        kernel: [
            [-1/25, -1/25, -1/25, -1/25, -1/25],
            [-1/25, -1/25, -1/25, -1/25, -1/25],
            [-1/25, -1/25, 49/25, -1/25, -1/25],
            [-1/25, -1/25, -1/25, -1/25, -1/25],
            [-1/25, -1/25, -1/25, -1/25, -1/25]
        ],
        clamp: true
    });
};