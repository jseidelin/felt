"use strict";
const gaussian = require("./gaussian");

module.exports = function unsharpmask(src, options) {
    const {data, width, height} = src;
    const {amount, kernelSize, threshold} = options;
    const n = width * height * 4;
    const dstData = new Uint8ClampedArray(n * 4);

    const tmpData = gaussian(src, {kernelSize}).data;

    for (let i = 0; i < n; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        let r2 = tmpData[i];
        let g2 = tmpData[i + 1];
        let b2 = tmpData[i + 2];

        let difR = r - r2;
        let difG = g - g2;
        let difB = b - b2;

        if (difR > threshold || difR < -threshold) {
            r = amount * difR + r2;
        }
        if (difG > threshold || difG < -threshold) {
            g = amount * difG + g2;
        }
        if (difB > threshold || difB < -threshold) {
            b = amount * difB + b2;
        }

        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;

        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;

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