'use strict';

var socketColorsChance = require('../dist/');
var test = require('tape');
var isFunction = require('lodash.isfunction');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(socketColorsChance));
});

test('1s', function(t) {
  t.plan(3);

  t.equal(socketColorsChance({
    sockets: 1,
    red: 1
  }), 1 / 3);

  t.equal(socketColorsChance({
    sockets: 1,
    green: 1
  }), 1 / 3);

  t.equal(socketColorsChance({
    sockets: 1,
    blue: 1
  }), 1 / 3);
});

test('3s: 1R, 1G, 1B', function(t) {
  t.plan(1);
  t.equal(socketColorsChance({
    sockets: 3,
    red: 1,
    green: 1,
    blue: 1
  }), 0.2222222222222222);
});

test('throws on invalid sockets', function(t) {
  t.plan(3);

  var expected = new RegExp(/expected: 0 < opts.sockets < 7/);

  t.throws(socketColorsChance.bind(null, {}), expected);
  t.throws(socketColorsChance.bind(null, { sockets: 0 }), expected);
  t.throws(socketColorsChance.bind(null, { sockets: 7 }), expected);
});

test('throws on invalid desired sockets', function(t) {
  var FIXTURES = [
    { red: -1 },
    { green: -2 },
    { blue: -3 },
    {},
    { red: 7 },
    { green: 8 },
    { blue: 9 },
    { red: 3, green: 2, blue: 2 }
  ];
  var invalidMsg = new RegExp(/invalid number of desired sockets/);

  t.plan(FIXTURES.length);

  FIXTURES.forEach(function(f) {
    f.sockets = 6;
    t.throws(socketColorsChance.bind(null, f), invalidMsg);
  });
});
