'use strict'

const transportationMean = {
  PLANE_INTERCONTINENTAL_ONE_PERSON_KM: {
    name: 'PLANE_INTERCONTINENTAL_ONE_PERSON_KM',
    french: 'avion intercontinental',
    embodied: {
      humanHealth: 5.85 * Math.pow(10, -8),
      ecosystemQuality: 0.0108,
      climateChange: 0.109,
      resources: 1.69
    },
    isComputedByPersonKm: true
  },
  PLANE_INTRACONTINENTAL_ONE_PERSON_KM: {
    name: 'PLANE_INTRACONTINENTAL_ONE_PERSON_KM',
    french: 'avion intracontinental',
    embodied: {
      humanHealth: 8.75 * Math.pow(10, -8),
      ecosystemQuality: 0.0163,
      climateChange: 0.167,
      resources: 2.59
    },
    isComputedByPersonKm: true
  },
  BUS_LARGE_DISTANCE_ONE_PERSON_KM: {
    name: 'BUS_LARGE_DISTANCE_ONE_PERSON_KM',
    french: 'bus longue distance',
    embodied: {
      humanHealth: 1.3 * Math.pow(10, -7),
      ecosystemQuality: 0.0354,
      climateChange: 0.099,
      resources: 1.49
    },
    isComputedByPersonKm: true
  },
  BUS_CITY_ONE_PERSON_KM: {
    name: 'BUS_CITY_ONE_PERSON_KM',
    french: 'bus en ville',
    embodied: {
      humanHealth: 6.13 * Math.pow(10, -8),
      ecosystemQuality: 0.0214,
      climateChange: 0.0497,
      resources: 0.764
    },
    isComputedByPersonKm: true
  },
  CAR_ELECTRIC_ONE_KM: {
    name: 'CAR_ELECTRIC_ONE_KM',
    french: 'voiture électrique',
    embodied: {
      humanHealth: 3.73 * Math.pow(10, -7),
      ecosystemQuality: 0.0855,
      climateChange: 0.235,
      resources: 3.44
    },
    isComputedByPersonKm: false
  },
  CAR_HEAT_ENGINE_ONE_KM: {
    name: 'CAR_HEAT_ENGINE_ONE_KM',
    french: 'voiture moteur thermique',
    embodied: {
      humanHealth: 2.58 * Math.pow(10, -7),
      ecosystemQuality: 0.086,
      climateChange: 0.325,
      resources: 5.04
    },
    isComputedByPersonKm: false
  },
  TRAIN_HIGH_SPEED_ONE_PERSON_KM: {
    name: 'TRAIN_HIGH_SPEED_ONE_PERSON_KM',
    french: 'train à grande vitesse',
    embodied: {
      humanHealth: 1.76 * Math.pow(10, -8),
      ecosystemQuality: 0.00844,
      climateChange: 0.0122,
      resources: 1.15
    },
    isComputedByPersonKm: true
  },
  TRAIN_REGIONAL_ONE_PERSON_KM: {
    name: 'TRAIN_REGIONAL_ONE_PERSON_KM',
    french: 'train régional',
    embodied: {
      humanHealth: 1.5 * Math.pow(10, -8),
      ecosystemQuality: 0.00736,
      climateChange: 0.0106,
      resources: 0.8
    },
    isComputedByPersonKm: true
  },
  TRAIN_URBAN_ONE_PERSON_KM: {
    name: 'TRAIN_URBAN_ONE_PERSON_KM',
    french: 'train urbain',
    embodied: {
      humanHealth: 1.34 * Math.pow(10, -8),
      ecosystemQuality: 0.00505,
      climateChange: 0.0106,
      resources: 0.477
    },
    isComputedByPersonKm: true
  },
  TRAMWAY_ONE_PERSON_KM: {
    name: 'TRAMWAY_ONE_PERSON_KM',
    french: 'tramway',
    embodied: {
      humanHealth: 3.93 * Math.pow(10, -8),
      ecosystemQuality: 0.00887,
      climateChange: 0.0341,
      resources: 0.921
    },
    isComputedByPersonKm: true
  },
  BIKE_ONE_PERSON_ONE_KM: {
    name: 'BIKE_ONE_PERSON_ONE_KM',
    french: 'vélo',
    embodied: {
      humanHealth: 1.6 * Math.pow(10, -8),
      ecosystemQuality: 0.00251,
      climateChange: 0.0131,
      resources: 0.169
    },
    isComputedByPersonKm: true
  }
}

module.exports = transportationMean
