"use strict";

module.exports = function desaturate(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const pixelCount = width * height;
    const dstData = new Uint8ClampedArray(pixelCount * 4);

    const n = width * height * 4;

    for (let i = 0; i < n; i += 4) {
        let level = srcData[i] * 0.3 + srcData[i+1] * 0.59 + srcData[i+2] * 0.11;
        dstData[i] = level;
        dstData[i+1] = level;
        dstData[i+2] = level;
        dstData[i+3] = srcData[i+3];
    }
    return {
        data: dstData,
        width: width,
        height: height
    };
};