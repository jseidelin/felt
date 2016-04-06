"use strict";

module.exports = function solarize(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const pixelCount = width * height;
    const dstData = new Uint8ClampedArray(pixelCount * 4);

    const n = width * height * 4;

    for (let i = 0; i < n; i += 4) {
        let r = srcData[i];
        let g = srcData[i+1];
        let b = srcData[i+2];
        dstData[i] = r > 127 ? 255 - r : r;
        dstData[i+1] = g > 127 ? 255 - g : g;
        dstData[i+2] = b > 127 ? 255 - b : b;
        dstData[i+3] = srcData[i+3];
    }
    return {
        data: dstData,
        width: width,
        height: height
    };
};