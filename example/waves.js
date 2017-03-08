#!/usr/bin/env node
'use strict';

/* eslint-disable no-console */

const pigpiod  = require('../lib/pigpiod.js');

const pi = pigpiod.pigpio_start();

if(pi < 0) {
  throw new Error('Failed to pigpiod.pidpio_start()');
}

var txPin = 17;

pigpiod.wave_tx_stop(pi);

pigpiod.wave_add_new(pi);
pigpiod.set_mode(pi, txPin, pigpiod.PI_OUTPUT);

var pulse1 = {};
pulse1.gpioOn = 131072;
pulse1.gpioOff = 0;
pulse1.usDelay = 10800;

var pulse2 = {};
pulse2.gpioOn = 0;
pulse2.gpioOff = 131072;
pulse2.usDelay = 10800;

var pulses = [];

for (var i=0; i<50; i++) {
  pulses.push(pulse1);
  pulses.push(pulse2);
}

var totalPulses = pigpiod.wave_add_generic(pi, pulses.length, pulses);
var waveId = pigpiod.wave_create(pi);
pigpiod.wave_send_once(pi, waveId);

setTimeout(function() {
  pigpiod.pigpio_stop(pi);
}, 3000);