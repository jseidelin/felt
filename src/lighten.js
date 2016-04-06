"use strict";

module.exports = function lighten(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const pixelCount = width * height;
    const dstData = new Uint8ClampedArray(pixelCount * 4);
    const n = width * height * 4;
    const mul = 1 + options.amount;

    for (let i = 0; i < n; i += 4) {
        dstData[i] = srcData[i] * mul;
        dstData[i+1] = srcData[i+1] * mul; 
        dstData[i+2] = srcData[i+2] * mul;
        dstData[i+3] = srcData[i+3];
    }
    return {
        data: dstData,
        width: width,
        height: height
    };
};