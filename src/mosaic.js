"use strict";

module.exports = function solarize(src, options) {
    const {data, width, height} = src;
    let {cellSize} = options;

    const n = width * height * 4;
    const cw = Math.ceil(width / cellSize) | 0;
    const ch = Math.ceil(height / cellSize) | 0;
    const cn = cw * ch * 4;
    const dstData = new Uint8ClampedArray(n);
    const tmpSums = new Uint32Array(cn);
    const tmpData = new Uint8ClampedArray(cn);
    const tmpCount = new Uint32Array(cw*ch);

    for (let y = 0; y < height; y++) {
        const cy = (y / cellSize) | 0;
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const cx = (x / cellSize) | 0;
            const cj = (cy * cw + cx) | 0;
            const ci = (cj * 4) | 0;
            tmpCount[cj]++;
            tmpSums[ci] += data[i];
            tmpSums[ci+1] += data[i+1];
            tmpSums[ci+2] += data[i+2];
            tmpSums[ci+3] += data[i+3];
        }
    }

    for (let i = 0, n = cw * ch; i < n; i++) {
        const count = tmpCount[i];
        const j = i * 4;
        tmpData[j] = tmpSums[j] / count;
        tmpData[j+1] = tmpSums[j+1] / count;
        tmpData[j+2] = tmpSums[j+2] / count;
        tmpData[j+3] = tmpSums[j+2] / count;
    }

    for (let y = 0; y < height; y++) {
        const cy = (y / cellSize) | 0;
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const cx = (x / cellSize) | 0;
            const ci = ((cy * cw + cx) * 4) | 0;
            dstData[i] = tmpData[ci];
            dstData[i+1] = tmpData[ci+1];
            dstData[i+2] = tmpData[ci+2];
            dstData[i+3] = tmpData[ci+3];
        }
    }

    return {
        data: dstData,
        width: width,
        height: height
    };
};