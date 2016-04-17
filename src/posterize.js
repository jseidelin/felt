"use strict";

module.exports = function posterize(src, options) {
    const {data, width, height} = src;
    const {levels} = options;
    const n = width * height * 4;
    const dstData = new Uint8ClampedArray(n);

    const numAreas = 256 / levels;
    const numValues = 256 / (levels - 1);

    for (let i = 0; i < n; i += 4) {
        dstData[i]     = numValues * ((data[i]     / numAreas)>>0);
        dstData[i + 1] = numValues * ((data[i + 1] / numAreas)>>0);
        dstData[i + 2] = numValues * ((data[i + 2] / numAreas)>>0);
        dstData[i + 3] = data[i + 3];
    }
    return {
        data: dstData,
        width: width,
        height: height
    };
};