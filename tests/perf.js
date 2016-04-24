/* eslint-env mocha */

"use strict";

const felt = require("../index.js");

const expect = require("expect");
const PNG = require("pngjs").PNG;
const fs = require("fs");
let perfTimeBase = 0;

function getImageData(src, callback) {
    fs.createReadStream(__dirname + "/" + src).pipe(
        new PNG({filterType: 4})
    ).on("parsed", function() {
        callback(this);
    });
}

before((done) => {
    getImageData("large.png", (input) => {
        const startTime = Date.now();
        const n = input.data.length;
        // Note: var is significantly faster than let (the distributed code is fortunately compiled to ES5)
        for (var i = 0; i < n; i++) {
            input.data[i] = i & 0xFF;
        }
        perfTimeBase = (Date.now() - startTime);
        done();
    });
});

describe("felt", function() {

    let input;

    before((done) => {
        getImageData("large.png", (a) => {
            input = a;
            done();
        });
    });

    describe("brightness()", function() {
        it("should not be slow", function(done) {
            const startTime = Date.now();
            felt.brightness(input, {
                brightness: -0.25,
                contrast: 0.75
            });
            const deltaTime = Date.now() - startTime;
            expect(deltaTime).toBeLessThan(perfTimeBase * 3);
            done();
        });
    });

    describe("desaturate()", function() {
        it("should not be slow", function(done) {
            const startTime = Date.now();
            felt.desaturate(input);
            const deltaTime = Date.now() - startTime;
            expect(deltaTime).toBeLessThan(perfTimeBase * 2);
            done();
        });
    });

    describe("invert()", function() {
        it("should not be slow", function(done) {
            const startTime = Date.now();
            felt.invert(input);
            const deltaTime = Date.now() - startTime;
            expect(deltaTime).toBeLessThan(perfTimeBase * 2);
            done();
        });
    });

    describe("lighten()", function() {
        it("should not be slow", function(done) {
            const startTime = Date.now();
            felt.lighten(input, {
                amount: 0.5
            });
            const deltaTime = Date.now() - startTime;
            expect(deltaTime).toBeLessThan(perfTimeBase * 2);
            done();
        });
    });

    describe("sepia()", function() {
        it("should not be slow", function(done) {
            const startTime = Date.now();
            felt.sepia(input);
            const deltaTime = Date.now() - startTime;
            expect(deltaTime).toBeLessThan(perfTimeBase * 2);
            done();
        });
    });

});