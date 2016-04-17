"use strict";
const convolve3x3 = require("./convolve3x3");

module.exports = function emboss3x3(src, options) {
    const {amount, angle} = options;
    const rad = -angle * Math.PI / 180;
    const x = Math.cos(rad) * amount;
    const y = Math.sin(rad) * amount;

    const kernel = [
        [-x - y,      -y,     -y + x],
        [    -x,       0,          x],
        [-x + y,       y,      y + x]
    ];

    return convolve3x3(src, {kernel, bias: 128, clamp: true});
};