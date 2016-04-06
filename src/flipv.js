"use strict";

module.exports = function flipv(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const pixelCount = width * height;
    const dstData = new Uint8ClampedArray(pixelCount * 4);

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            let i = ((y * width + (width - x - 1)) * 4) | 0;
            let j = ((y * width + x) * 4) | 0;

            dstData[i]   = srcData[j];
            dstData[i+1] = srcData[j+1];
            dstData[i+2] = srcData[j+2];
            dstData[i+3] = srcData[j+3];
        }
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};
