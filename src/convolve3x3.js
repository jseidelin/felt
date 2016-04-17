"use strict";

module.exports = function convolve3x3(src, options) {
    const {data, width, height} = src;
    const {kernel, bias = 0, clamp, alpha, mono, invert} = options;
    const pixelCount = width * height;
    const dstData = clamp ? new Uint8ClampedArray(pixelCount * 4) : new Int32Array(pixelCount * 4);

    const k00 = kernel[0][0], k01 = kernel[0][1], k02 = kernel[0][2],
          k10 = kernel[1][0], k11 = kernel[1][1], k12 = kernel[1][2],
          k20 = kernel[2][0], k21 = kernel[2][1], k22 = kernel[2][2];

    for (let y = 0; y < height; ++y) {
        let pyc = y * width * 4;
        let pyp = pyc - width * 4;
        let pyn = pyc + width * 4;

        if (y < 1) pyp = pyc;
        if (y >= height - 1) pyn = pyc;

        for (let x = 0; x < width; ++x) {
            const i = (y * width + x) * 4;

            let pxc = x * 4;
            let pxp = pxc - 4;
            let pxn = pxc + 4;

            if (x < 1) pxp = pxc;
            if (x >= width-1) pxn = pxc;

            const p00 = (pyp + pxp) | 0;
            const p01 = (pyp + pxc) | 0;
            const p02 = (pyp + pxn) | 0;
            const p10 = (pyc + pxp) | 0;
            const p11 = (pyc + pxc) | 0;
            const p12 = (pyc + pxn) | 0;
            const p20 = (pyn + pxp) | 0;
            const p21 = (pyn + pxc) | 0;
            const p22 = (pyn + pxn) | 0;

            let r, g, b, a;

            r = data[p00] * k00 + data[p01] * k01 + data[p02] * k02
              + data[p10] * k10 + data[p11] * k11 + data[p12] * k12
              + data[p20] * k20 + data[p21] * k21 + data[p22] * k22
              + bias;

            g = data[p00 + 1] * k00 + data[p01 + 1] * k01 + data[p02 + 1] * k02
              + data[p10 + 1] * k10 + data[p11 + 1] * k11 + data[p12 + 1] * k12
              + data[p20 + 1] * k20 + data[p21 + 1] * k21 + data[p22 + 1] * k22
              + bias;

            b = data[p00 + 2] * k00 + data[p01 + 2] * k01 + data[p02 + 2] * k02
              + data[p10 + 2] * k10 + data[p11 + 2] * k11 + data[p12 + 2] * k12
              + data[p20 + 2] * k20 + data[p21 + 2] * k21 + data[p22 + 2] * k22
              + bias;

            if (alpha) {
                a = data[p00 + 3] * k00 + data[p01 + 3] * k01 + data[p02 + 3] * k02
                  + data[p10 + 3] * k10 + data[p11 + 3] * k11 + data[p12 + 3] * k12
                  + data[p20 + 3] * k20 + data[p21 + 3] * k21 + data[p22 + 3] * k22;
            } else {
                a = data[i+3];
            }

            if (mono) {
                r = g = b = (r + g + b) / 3;
            }
            if (invert) {
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

