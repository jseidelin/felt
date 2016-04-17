"use strict";
const convolve3x3 = require("./convolve3x3");

module.exports = function edgeenhance3x3(src, options) {
    return convolve3x3(src, {
        kernel: [
            [-1/9,  -1/9, -1/9],
            [-1/9,  17/9, -1/9],
            [-1/9,  -1/9, -1/9]
        ],
        clamp: true
    });
};