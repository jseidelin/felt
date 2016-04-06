"use strict";

module.exports = function crop(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;

    const cropLeft = options.left;
    const cropTop = options.top;
    const cropWidth = options.width;
    const cropHeight = options.height;

    if ((cropLeft + cropWidth > width) || (cropTop + cropHeight > height)) {
        throw new RangeError("Crop parameters must be within source image dimensions");
    }

    const n = cropWidth * cropHeight * 4;

    const dstData = new Uint8ClampedArray(n);

    for (let y = 0; y < cropHeight; ++y) {
        for (let x = 0; x < cropWidth; ++x) {
            const i = (y * cropWidth + x) * 4;
            const j = ((y + cropLeft) * width + (x + cropTop)) * 4;
            dstData[i]   = srcData[j];
            dstData[i+1] = srcData[j+1];
            dstData[i+2] = srcData[j+2];
            dstData[i+3] = srcData[j+3];
        }
    }

    return {
        data: dstData,
        width: cropWidth,
        height: cropHeight
    };
};
