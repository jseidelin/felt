"use strict";
const gaussian = require("./gaussian");

module.exports = function glow(src, options) {
    const {data, width, height} = src;
    const {amount, kernelSize} = options;
    const n = width * height * 4;
    const dstData = new Uint8ClampedArray(n * 4);


    const tmpData = gaussian(src, {kernelSize}).data;

    for (let i = 0; i < n; i += 4) {
        let r = data[i]     + tmpData[i]     * amount;
        let g = data[i + 1] + tmpData[i + 1] * amount;
        let b = data[i + 2] + tmpData[i + 2] * amount;
        let a = data[i + 3];

        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;

        dstData[i] = r;
        dstData[i + 1] = g;
        dstData[i + 2] = b;
        dstData[i + 3] = a;
    }
    return {
        data: dstData,
        width: width,
        height: height
    };
};