"use strict";

module.exports = function brightness(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const pixelCount = width * height;
    const dstData = new Uint8ClampedArray(pixelCount * 4);

    const n = width * height * 4;

    const contrast = options.contrast / 2;
    const brightness = 1 + options.brightness;

    const brightMul = brightness < 0 ? - brightness : brightness;
    const brightAdd = brightness < 0 ? 0 : brightness;

    const contrastMul = 0.5 * Math.tan((contrast + 1) * Math.PI/4);
    const contrastAdd = - (contrastMul - 0.5) * 255;

    for (let i = 0; i < n; i += 4) {
        let r = srcData[i];
        let g = srcData[i+1];
        let b = srcData[i+2];
        
        r = (r + r * brightMul + brightAdd) * contrastMul + contrastAdd;
        g = (g + g * brightMul + brightAdd) * contrastMul + contrastAdd;
        b = (b + b * brightMul + brightAdd) * contrastMul + contrastAdd;
        
        dstData[i] = r;
        dstData[i+1] = g;
        dstData[i+2] = b;
        dstData[i+3] = srcData[i+3];
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};