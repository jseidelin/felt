"use strict";

module.exports = function convolve5x5(src, options) {
    const {data, width, height} = src;
    const {kernel, bias = 0, clamp, alpha, mono, invert} = options;
    const pixelCount = width * height;
    const dstData = clamp ? new Uint8ClampedArray(pixelCount * 4) : new Int32Array(pixelCount * 4);

    const k00 = kernel[0][0], k01 = kernel[0][1], k02 = kernel[0][2], k03 = kernel[0][3], k04 = kernel[0][4],
          k10 = kernel[1][0], k11 = kernel[1][1], k12 = kernel[1][2], k13 = kernel[1][3], k14 = kernel[1][4],
          k20 = kernel[2][0], k21 = kernel[2][1], k22 = kernel[2][2], k23 = kernel[2][3], k24 = kernel[2][4],
          k30 = kernel[3][0], k31 = kernel[3][1], k32 = kernel[3][2], k33 = kernel[3][3], k34 = kernel[3][4],
          k40 = kernel[4][0], k41 = kernel[4][1], k42 = kernel[4][2], k43 = kernel[4][3], k44 = kernel[4][4];

    for (let y = 0; y < height; ++y) {
        let pyc = y * width * 4;
        let pyp = pyc - width * 4;
        let pypp = pyc - width * 4 * 2;
        let pyn = pyc + width * 4;
        let pynn = pyc + width * 4 * 2;

        if (y < 1) pyp = pyc;
        if (y >= height-1) pyn = pyc;
        if (y < 2) pypp = pyp;
        if (y >= height-2) pynn = pyn;

        for (let x = 0; x < width; ++x) {
            const i = (y * width + x) * 4;

            let pxc = x * 4;
            let pxp = pxc - 4;
            let pxn = pxc + 4;
            let pxpp = pxc - 8;
            let pxnn = pxc + 8;

            if (x < 1) pxp = pxc;
            if (x >= width-1) pxn = pxc;
            if (x < 2) pxpp = pxp;
            if (x >= width-2) pxnn = pxn;

            const p00 = pypp + pxpp,    p01 = pypp + pxp,    p02 = pypp + pxc,    p03 = pypp + pxn,    p04 = pypp + pxnn,
                  p10 = pyp  + pxpp,    p11 = pyp  + pxp,    p12 = pyp  + pxc,    p13 = pyp  + pxn,    p14 = pyp  + pxnn,
                  p20 = pyc  + pxpp,    p21 = pyc  + pxp,    p22 = pyc  + pxc,    p23 = pyc  + pxn,    p24 = pyc  + pxnn,
                  p30 = pyn  + pxpp,    p31 = pyn  + pxp,    p32 = pyn  + pxc,    p33 = pyn  + pxn,    p34 = pyn  + pxnn,
                  p40 = pynn + pxpp,    p41 = pynn + pxp,    p42 = pynn + pxc,    p43 = pynn + pxn,    p44 = pynn + pxnn;

            let r, g, b, a;

            r = data[p00] * k00 + data[p01] * k01 + data[p02] * k02 + data[p03] * k03 + data[p04] * k04
              + data[p10] * k10 + data[p11] * k11 + data[p12] * k12 + data[p13] * k13 + data[p14] * k14
              + data[p20] * k20 + data[p21] * k21 + data[p22] * k22 + data[p23] * k23 + data[p24] * k24
              + data[p30] * k30 + data[p31] * k31 + data[p32] * k32 + data[p33] * k33 + data[p34] * k34
              + data[p40] * k40 + data[p41] * k41 + data[p42] * k42 + data[p43] * k43 + data[p44] * k44
              + bias;

            g = data[p00+1] * k00 + data[p01+1] * k01 + data[p02+1] * k02 + data[p03+1] * k03 + data[p04+1] * k04
              + data[p10+1] * k10 + data[p11+1] * k11 + data[p12+1] * k12 + data[p13+1] * k13 + data[p14+1] * k14
              + data[p20+1] * k20 + data[p21+1] * k21 + data[p22+1] * k22 + data[p23+1] * k23 + data[p24+1] * k24
              + data[p30+1] * k30 + data[p31+1] * k31 + data[p32+1] * k32 + data[p33+1] * k33 + data[p34+1] * k34
              + data[p40+1] * k40 + data[p41+1] * k41 + data[p42+1] * k42 + data[p43+1] * k43 + data[p44+1] * k44
              + bias;

            b = data[p00+2] * k00 + data[p01+2] * k01 + data[p02+2] * k02 + data[p03+2] * k03 + data[p04+2] * k04
              + data[p10+2] * k10 + data[p11+2] * k11 + data[p12+2] * k12 + data[p13+2] * k13 + data[p14+2] * k14
              + data[p20+2] * k20 + data[p21+2] * k21 + data[p22+2] * k22 + data[p23+2] * k23 + data[p24+2] * k24
              + data[p30+2] * k30 + data[p31+2] * k31 + data[p32+2] * k32 + data[p33+2] * k33 + data[p34+2] * k34
              + data[p40+2] * k40 + data[p41+2] * k41 + data[p42+2] * k42 + data[p43+2] * k43 + data[p44+2] * k44
              + bias;

            if (alpha) {
                a = data[p00+3] * k00 + data[p01+3] * k01 + data[p02+3] * k02 + data[p03+3] * k03 + data[p04+3] * k04
                  + data[p10+3] * k10 + data[p11+3] * k11 + data[p12+3] * k12 + data[p13+3] * k13 + data[p14+3] * k14
                  + data[p20+3] * k20 + data[p21+3] * k21 + data[p22+3] * k22 + data[p23+3] * k23 + data[p24+3] * k24
                  + data[p30+3] * k30 + data[p31+3] * k31 + data[p32+3] * k32 + data[p33+3] * k33 + data[p34+3] * k34
                  + data[p40+3] * k40 + data[p41+3] * k41 + data[p42+3] * k42 + data[p43+3] * k43 + data[p44+3] * k44;
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
            dstData[i + 1] = g;
            dstData[i + 2] = b;
            dstData[i + 3] = a;
        }
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};

