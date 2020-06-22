'use strict';

const network = {
  NETWORK_ENERGETIC_INTENSITY: {
    french: 'intensité énergétique du réseau',
    operatingOneBit: {
      lower: {
        humanHealth: 1.68 * Math.pow(10, -17),
        ecosystemQuality: 7.76 * Math.pow(10, -12),
        climateChange: 1.34 * Math.pow(10, -11),
        resources: 3.47 * Math.pow(10, -9)
      },
      upper: {
        humanHealth: 2.8 * Math.pow(10, -17),
        ecosystemQuality: 1.29 * Math.pow(10, -11),
        climateChange: 2.23 * Math.pow(10, -11),
        resources: 5.77 * Math.pow(10, -9)
      }
    }
  }
};

module.exports = network;
