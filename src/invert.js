"use strict";

module.exports = function invert(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const pixelCount = width * height;
    const dstData = new Uint8ClampedArray(pixelCount * 4);
    const n = width * height * 4;

    for (let i = 0; i < n; i += 4) {
        dstData[i]   = 255 - srcData[i];
        dstData[i+1] = 255 - srcData[i+1];
        dstData[i+2] = 255 - srcData[i+2];
        dstData[i+3] = srcData[i+3];
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};
