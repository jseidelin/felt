"use strict";

module.exports = function convolve3x3(src, options) {
    const srcData = src.data;
    const {width, height} = src;
    const pixelCount = width * height;
    const tmpData = new Uint8ClampedArray(pixelCount * 4);
    const dstData = new Uint8ClampedArray(pixelCount * 4);

    const kernelSize = Math.min(Math.max(options.kernelSize, 3), 13);

    const k1 = -kernelSize / 2 + (kernelSize % 2 ? 0.5 : 0),
          k2 = kernelSize + k1;

    const pascal = [[1]];

    for (let i = 1; i < kernelSize; ++i) {
        pascal[0][i] = 0;
    }
    for (let i = 1; i < kernelSize; ++i) {
        pascal[i] = [1];
        for (let j = 1; j < kernelSize; ++j) {
            pascal[i][j] = pascal[i-1][j] + pascal[i-1][j-1];
        }
    }

    let weights = pascal[kernelSize - 1];
    let sum = weights.reduce((a, b) => a + b);
    weights = weights.map(x => x / sum);

    // pass 1
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x <width; ++x) {
            let r = 0, g = 0, b = 0, a = 0;

            for (let i = k1; i < k2; ++i) {
                let inx = x + i;
                let iny = y;
                const w = weights[i - k1];

                if (inx < 0) {
                    inx = 0;
                }
                if (inx >= width) {
                    inx = width - 1;
                }

                const idx = (iny * width + inx) * 4;

                r += srcData[idx] * w;
                g += srcData[idx + 1] * w;
                b += srcData[idx + 2] * w;
                a += srcData[idx + 3] * w;
            }

            const idx = (y * width + x) * 4;

            tmpData[idx] = r;
            tmpData[idx+1] = g;
            tmpData[idx+2] = b;
            tmpData[idx+3] = a;
        }
    }

    // pass 2
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            let r = 0, g = 0, b = 0, a = 0;

            for (let i = k1; i < k2; ++i) {
                let inx = x;
                let iny = y + i;
                const w = weights[i - k1];

                if (iny < 0) {
                    iny = 0;
                }
                if (iny >= height) {
                    iny = height - 1;
                }

                const idx = (iny * width + inx) * 4;

                r += tmpData[idx] * w;
                g += tmpData[idx + 1] * w;
                b += tmpData[idx + 2] * w;
                a += tmpData[idx + 3] * w;
            }

            const idx = (y * width + x) * 4;

            dstData[idx] = r;
            dstData[idx+1] = g;
            dstData[idx+2] = b;
            dstData[idx+3] = a;
        }
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};

