/* eslint-env mocha */

"use strict";

const felt = require("../index.js");

const expect = require("expect");
const PNG = require("pngjs").PNG;
const fs = require("fs");


function getImageData(src, callback) {
    fs.createReadStream(__dirname + "/" + src).pipe(
        new PNG({filterType: 4})
    ).on("parsed", function() {
        callback(this);
    });
}

function compareImageData(src, dst) {
    expect(src.width).toEqual(dst.width);
    expect(src.height).toEqual(dst.height);
    expect(src.data.length).toEqual(dst.data.length);

    const buf1 = new Buffer(dst.data);
    const buf2 = new Buffer(src.data);

    expect(buf1.compare(buf2)).toEqual(0);
}

describe("felt", function() {

    let input;

    beforeEach((done) => {
        getImageData("input.png", (a) => {
            input = a;
            done();
        });
    });

    describe("invert()", function() {
        it("should invert image", function(done) {
            getImageData("results/invert.png", (expectedData) => {
                const outData = felt.invert(input);
                compareImageData(outData, expectedData);
                done();
            });
        });
    });

    describe("sepia()", function() {
        it("should apply sepia toning to image", function(done) {
            getImageData("results/sepia.png", (expectedData) => {
                const outData = felt.sepia(input);
                compareImageData(outData, expectedData);
                done();
            });
        });
    });

    describe("brightness()", function() {

        it("should apply low brightness to image", function(done) {
            getImageData("results/low_brightness.png", (expectedData) => {
                const outData = felt.brightness(input, {
                    brightness: -0.5,
                    contrast: 0
                });
                compareImageData(outData, expectedData);
                done();
            });
        });

        it("should apply high brightness to image", function(done) {
            getImageData("results/high_brightness.png", (expectedData) => {
                const outData = felt.brightness(input, {
                    brightness: 0.5,
                    contrast: 0
                });
                compareImageData(outData, expectedData);
                done();
            });
        });

        it("should apply low contrast to image", function(done) {
            getImageData("results/low_contrast.png", (expectedData) => {
                const outData = felt.brightness(input, {
                    brightness: 0,
                    contrast: -0.5
                });
                compareImageData(outData, expectedData);
                done();
            });
        });

        it("should apply high contrast to image", function(done) {
            getImageData("results/high_contrast.png", (expectedData) => {
                const outData = felt.brightness(input, {
                    brightness: 0,
                    contrast: 0.5
                });
                compareImageData(outData, expectedData);
                done();
            });
        });

        it("should apply both brightness and contrast to image", function(done) {
            getImageData("results/brightness_contrast.png", (expectedData) => {
                const outData = felt.brightness(input, {
                    brightness: -0.25,
                    contrast: 0.75
                });
                compareImageData(outData, expectedData);
                done();
            });
        });

    });

    describe("desaturate()", function() {
        it("should desaturate image", function(done) {
            getImageData("results/desaturate.png", (expectedData) => {
                const outData = felt.desaturate(input);
                compareImageData(outData, expectedData);
                done();
            });
        });
    });

    describe("lighten()", function() {
        it("should lighten image", function(done) {
            getImageData("results/lighten.png", (expectedData) => {
                const outData = felt.lighten(input, {
                    amount: 0.5
                });
                compareImageData(outData, expectedData);
                done();
            });
        });

        it("should darken image", function(done) {
            getImageData("results/lighten_dark.png", (expectedData) => {
                const outData = felt.lighten(input, {
                    amount: -0.5
                });
                compareImageData(outData, expectedData);
                done();
            });
        });

    });


});