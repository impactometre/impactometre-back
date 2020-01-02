'use strict'

const network = {
  NETWORK_ENERGETIC_INTENSITY: {
    french: 'intensité énergétique du réseau',
    operatingOneBitLower: {
      humanHealth: Math.pow(1.68, -17),
      ecosystemQuality: Math.pow(7.76, -12),
      climateChange: Math.pow(1.34, -11),
      resources: Math.pow(3.47, -9)
    },
    operatingOneBitUpper: {
      humanHealth: Math.pow(2.8, -17),
      ecosystemQuality: Math.pow(1.29, -11),
      climateChange: Math.pow(2.23, -11),
      resources: Math.pow(5.77, -9)
    }
  }
}

module.exports = network
