/* eslint-env mocha */

"use strict";

const felt = require("../index.js");
const PNG = require("pngjs").PNG;
const fs = require("fs");
const async = require("async");

function getImageData(src, callback) {
    fs.createReadStream(__dirname + "/" + src).pipe(
        new PNG({filterType: 4})
    ).on("parsed", function() {
        callback(this);
    });
}

function writeImageData(dst, imageData, callback) {
    var png = new PNG({
        filterType: 4,
        width: imageData.width,
        height: imageData.height,
        depth: 8
    });
    png.data = new Buffer(imageData.data);
    png.pack().pipe(fs.createWriteStream(__dirname + "/" + dst)).on("finish", callback);
}

const modes = [
    ["invert", "invert", {}],
    ["lighten", "lighten", {amount: 0.5}],
    ["lighten", "lighten_dark", {amount: -0.5}],
    ["sepia", "sepia", {}],
    ["brightness", "low_brightness", {brightness: -0.5, contrast: 0}],
    ["brightness", "high_brightness", {brightness: 0.5, contrast: 0}],
    ["brightness", "low_contrast", {brightness: 0, contrast: -0.5}],
    ["brightness", "high_contrast", {brightness: 0, contrast: 0.5}],
    ["brightness", "brightness_contrast", {brightness: -0.25, contrast: 0.75}],
    ["desaturate", "desaturate", {}],
    ["flipv", "flipv", {}],
    ["fliph", "fliph", {}],
    ["crop", "crop", {left: 20, top: 30, width: 30, height: 20}],
    ["crop", "crop_full", {left: 0, top: 0, width: 64, height: 64}],
    ["convolve3x3", "convolve3x3", {
        kernel: [
            [1,  1, 1],
            [1, -8, 1],
            [1,  1, 1]
        ]
    }]
];

async.eachSeries(modes, (mode, callback) => {
    getImageData("input.png", (input) => {
        const outData = felt[mode[0]](input, mode[2]);
        writeImageData("results/" + mode[1] + ".png", outData, () => {
            callback();
        });
    });
});


