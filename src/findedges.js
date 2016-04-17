"use strict";
const convolve3x3 = require("./convolve3x3");

module.exports = function findedges(src, options) {
    const {data, width, height} = src;
    const n = width * height * 4;
    const dstData = new Uint8ClampedArray(n * 4);

    const kernel1 = [
        [-1,  0,  1],
        [-2,  0,  2],
        [-1,  0,  1]
    ];

    const kernel2 = [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
    ];

    const tmpData1 = convolve3x3(src, {kernel: kernel1}).data;
    const tmpData2 = convolve3x3(src, {kernel: kernel2}).data;

    for (let i = 0; i < n; i += 4) {
        let gr1 = tmpData1[i];
        let gr2 = tmpData2[i];
        let gg1 = tmpData1[i+1];
        let gg2 = tmpData2[i+1];
        let gb1 = tmpData1[i+2];
        let gb2 = tmpData2[i+2];

        let r = Math.sqrt(gr1*gr1 + gr2*gr2);
        let g = Math.sqrt(gg1*gg1 + gg2*gg2);
        let b = Math.sqrt(gb1*gb1 + gb2*gb2);

        dstData[i] = 255 - r;
        dstData[i+1] = 255 - g;
        dstData[i+2] = 255 - b;
        dstData[i+3] = data[i+3];
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};