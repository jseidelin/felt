"use strict";

module.exports = function convolve3x3(src, options) {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const pixelCount = width * height;
    const dstData = new Uint8ClampedArray(pixelCount * 4);

    const kernel = options.kernel;
    const k00 = kernel[0][0], k01 = kernel[0][1], k02 = kernel[0][2];
    const k10 = kernel[1][0], k11 = kernel[1][1], k12 = kernel[1][2];
    const k20 = kernel[2][0], k21 = kernel[2][1], k22 = kernel[2][2];

    for (let y = 0; y < height; ++y) {
        let pyc = y * width * 4;
        let pyp = pyc - width * 4;
        let pyn = pyc + width * 4;

        if (y < 1) pyp = pyc;
        if (y >= width - 1) pyn = pyc;

        for (let x = 0; x < width; ++x) {
            const i = (y * width + x) * 4;

            let pxc = x * 4;
            let pxp = pxc - 4;
            let pxn = pxc + 4;

            if (x < 1) pxp = pxc;
            if (x >= width-1) pxn = pxc;

            const p00 = pyp + pxp;
            const p01 = pyp + pxc;
            const p02 = pyp + pxn;
            const p10 = pyc + pxp;
            const p11 = pyc + pxc;
            const p12 = pyc + pxn;
            const p20 = pyn + pxp;
            const p21 = pyn + pxc;
            const p22 = pyn + pxn;

            let r, g, b, a;

            r = srcData[p00] * k00 + srcData[p01] * k01 + srcData[p02] * k02
                + srcData[p10] * k10 + srcData[p11] * k11 + srcData[p12] * k12
                + srcData[p20] * k20 + srcData[p21] * k21 + srcData[p22] * k22;

            g = srcData[p00 + 1] * k00 + srcData[p01 + 1] * k01 + srcData[p02 + 1] * k02
                + srcData[p10 + 1] * k10 + srcData[p11 + 1] * k11 + srcData[p12 + 1] * k12
                + srcData[p20 + 1] * k20 + srcData[p21 + 1] * k21 + srcData[p22 + 1] * k22;

            b = srcData[p00 + 2] * k00 + srcData[p01 + 2] * k01 + srcData[p02 + 2] * k02
                + srcData[p10 + 2] * k10 + srcData[p11 + 2] * k11 + srcData[p12 + 2] * k12
                + srcData[p20 + 2] * k20 + srcData[p21 + 2] * k21 + srcData[p22 + 2] * k22;

            if (options.alpha) {
                a = srcData[p00 + 3] * k00 + srcData[p01 + 3] * k01 + srcData[p02 + 3] * k02
                    + srcData[p10 + 3] * k10 + srcData[p11 + 3] * k11 + srcData[p12 + 3] * k12
                    + srcData[p20 + 3] * k20 + srcData[p21 + 3] * k21 + srcData[p22 + 3] * k22;
            } else {
                a = srcData[i+3];
            }

            if (options.mono) {
                r = g = b = (r + g + b) / 3;
            }
            if (options.invert) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
            }

            dstData[i] = r;
            dstData[i+1] = g;
            dstData[i+2] = b;
            dstData[i+3] = a;
        }
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};

