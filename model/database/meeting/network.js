'use strict'

const network = {
  NETWORK_ENERGETIC_INTENSITY_LOWER: {
    french: 'intensité énergétique du réseau (estimation basse)',
    operatingOneBit: {
      humanHealth: Math.pow(1.68, -17),
      ecosystemQuality: Math.pow(7.76, -12),
      climateChange: Math.pow(1.34, -11),
      resources: Math.pow(3.47, -9)
    },
    // TODO : convert from electric consumption ?
    lifetime: 'unknown'
  },
  NETWORK_ENERGETIC_INTENSITY_UPPER: {
    french: 'intensité énergétique du réseau (estimation haute)',
    operatingOneBit: {
      humanHealth: Math.pow(2.8, -17),
      ecosystemQuality: Math.pow(1.29, -11),
      climateChange: Math.pow(2.23, -11),
      resources: Math.pow(5.77, -9)
    },
    lifetime: 'unknown'
  }
}

module.exports = network
