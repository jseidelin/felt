"use strict";
const convolve3x3 = require("./convolve3x3");

module.exports = function crossedges(src, options) {
    const a = options.strength * 5;

    return convolve3x3(src, {
        kernel: [
            [ 0, -a,  0],
            [-a,  0,  a],
            [ 0,  a,  0]
        ],
        mono: true,
        clamp: true
    });
};