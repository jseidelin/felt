"use strict";

module.exports = function sepia(src, options) {
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
        dstData[i] = (r * 0.393 + g * 0.769 + b * 0.189);
        dstData[i+1] = (r * 0.349 + g * 0.686 + b * 0.168);
        dstData[i+2] = (r * 0.272 + g * 0.534 + b * 0.131);
        dstData[i+3] = srcData[i+3];
    }
    return {
        data: dstData,
        width: width,
        height: height
    };
};