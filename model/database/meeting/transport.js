'use strict'

const transport = {
  PLANE_INTERCONTINENTAL_ONE_PERSON_KM: {
    french: 'avion intercontinental',
    embodied: {
      humanHealth: Math.pow(5.85, -8),
      ecosystemQuality: 0.0108,
      climateChange: 0.109,
      resources: 1.69
    },
    isPersonKm: true
  },
  PLANE_INTRACONTINENTAL_ONE_PERSON_KM: {
    french: 'avion intracontinental',
    embodied: {
      humanHealth: Math.pow(8.75, -8),
      ecosystemQuality: 0.0163,
      climateChange: 0.167,
      resources: 2.59
    },
    isPersonKm: true
  },
  BUS_LARGE_DISTANCE_ONE_PERSON_KM: {
    french: 'bus longue distance',
    embodied: {
      humanHealth: Math.pow(1.3, -7),
      ecosystemQuality: 0.0354,
      climateChange: 0.099,
      resources: 1.49
    },
    isPersonKm: true
  },
  BUS_CITY_ONE_PERSON_KM: {
    french: 'bus en ville',
    embodied: {
      humanHealth: Math.pow(6.13, -8),
      ecosystemQuality: 0.0214,
      climateChange: 0.0497,
      resources: 0.764
    },
    isPersonKm: true
  },
  CAR_ELECTRIC_ONE_KM: {
    french: 'voiture électrique',
    embodied: {
      humanHealth: Math.pow(1.3, -7),
      ecosystemQuality: 0.0354,
      climateChange: 0.099,
      resources: 1.49
    },
    isPersonKm: false
  },
  CAR_HEAT_ENGINE_ONE_KM: {
    french: 'voiture moteur thermique',
    embodied: {
      humanHealth: Math.pow(2.58, -7),
      ecosystemQuality: 0.086,
      climateChange: 0.325,
      resources: 5.04
    },
    isPersonKm: false
  },
  TRAIN_HIGH_SPEED_ONE_PERSON_KM: {
    french: 'train à grande vitesse',
    embodied: {
      humanHealth: Math.pow(1.76, -8),
      ecosystemQuality: 0.00844,
      climateChange: 0.0122,
      resources: 1.15
    },
    isPersonKm: true
  },
  TRAIN_REGIONAL_ONE_PERSON_KM: {
    french: 'train régional',
    embodied: {
      humanHealth: Math.pow(1.5, -8),
      ecosystemQuality: 0.00736,
      climateChange: 0.0106,
      resources: 0.8
    },
    isPersonKm: true
  },
  TRAIN_URBAN_ONE_PERSON_KM: {
    french: 'train urbain',
    embodied: {
      humanHealth: Math.pow(1.34, -8),
      ecosystemQuality: 0.00505,
      climateChange: 0.0106,
      resources: 0.477
    },
    isPersonKm: true
  },
  TRAMWAY_ONE_PERSON_KM: {
    french: 'tramway',
    embodied: {
      humanHealth: Math.pow(3.93, -8),
      ecosystemQuality: 0.00887,
      climateChange: 0.0341,
      resources: 0.921
    },
    isPersonKm: true
  },
  BIKE_ONE_PERSON_ONE_KM: {
    french: 'vélo',
    embodied: {
      humanHealth: Math.pow(1.6, -8),
      ecosystemQuality: 0.00251,
      climateChange: 0.0131,
      resources: 0.169
    },
    isPersonKm: true
  }
}

module.exports = transport
