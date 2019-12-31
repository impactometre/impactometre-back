'use strict'

const {
  hardwareLifetime,
  hardwareOperatingTimePerDay
} = require('../../../constants/meeting')

const hardware = {
  /**
   * DESKTOP AND LAPTOP
   * */
  DESKTOP: {
    name: 'DESKTOP',
    french: 'ordinateur fixe',
    operatingOneMin: {
      humanHealth: Math.pow(1.55, -10),
      ecosystemQuality: Math.pow(7.16, -5),
      climateChange: 0.000124,
      resources: 0.032
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  DESKTOP_WITHOUT_SCREEN: {
    name: 'DESKTOP_WITHOUT_SCREEN',
    french: 'ordinateur sans écran',
    embodied: {
      humanHealth: 0.00041,
      ecosystemQuality: 155,
      climateChange: 266,
      resources: Math.pow(3.74, 3)
    },
    operatingWithoutVisioOneMin: {
      humanHealth: Math.pow(1.66, -11),
      ecosystemQuality: Math.pow(7.63, -6),
      climateChange: Math.pow(1.32, -5),
      resources: 0.00341
    },
    operatingOneMin: {
      humanHealth: Math.pow(3.42, -11),
      ecosystemQuality: Math.pow(1.57, -5),
      climateChange: Math.pow(2.72, -5),
      resources: 0.00703
    },
    standbyOneMin: 'unknown',
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  DESKTOP_SCREEN_LCD: {
    name: 'DESKTOP_SCREEN_LCD',
    french: 'écran d\'ordinateur LCD',
    embodied: {
      humanHealth: 0.000475,
      ecosystemQuality: 140,
      climateChange: 360,
      resources: Math.pow(4.79, 3)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  COMPUTER_TOWER: {
    name: 'COMPUTER_TOWER',
    french: 'tour',
    embodied: {
      humanHealth: 0.000349,
      ecosystemQuality: 131,
      climateChange: 228,
      resources: Math.pow(3.19, 3)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  KEYBOARD: {
    name: 'KEYBOARD',
    french: 'clavier',
    embodied: {
      humanHealth: Math.pow(5.01, -5),
      ecosystemQuality: 19.6,
      climateChange: 31.5,
      resources: 453
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  COMPUTER_MOUSE: {
    name: 'COMPUTER_MOUSE',
    french: 'souris',
    embodied: {
      humanHealth: Math.pow(1.06, -5),
      ecosystemQuality: 4.73,
      climateChange: 6.56,
      resources: 93.5
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  LAPTOP: {
    name: 'LAPTOP',
    french: 'ordinateur portable',
    embodied: {
      humanHealth: 0.000274,
      ecosystemQuality: 82.7,
      climateChange: 166,
      resources: Math.pow(2.18, 3)
    },
    operatingOneMin: {
      humanHealth: Math.pow(4.14, -11),
      ecosystemQuality: Math.pow(1.91, -5),
      climateChange: Math.pow(3.3, -5),
      resources: 0.00852
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  /**
   * NETWORK ACCESS
   */
  INTERNET_ACCESS_EQUIPMENT: {
    name: 'INTERNET_ACCESS_EQUIPMENT',
    french: "équipement d'accès Internet",
    embodied: {
      humanHealth: Math.pow(1.26, -5),
      ecosystemQuality: 5.6,
      climateChange: 7.21,
      resources: 103
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  /**
   * PERIPHERALS
   */
  MICROPHONE: {
    name: 'MICROPHONE',
    french: 'micro',
    operatingOneMin: {
      humanHealth: Math.pow(2.59, -12),
      ecosystemQuality: Math.pow(1.19, -6),
      climateChange: Math.pow(2.06, -6),
      resources: 0.000533
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  CAMERA: {
    name: 'CAMERA',
    french: 'caméra',
    operatingOneMin: {
      humanHealth: Math.pow(9.84, -12),
      ecosystemQuality: Math.pow(4.53, -6),
      climateChange: Math.pow(7.84, -6),
      resources: 0.00202
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  PROJECTOR: {
    name: 'PROJECTOR',
    embodied: {
      humanHealth: Math.pow(8.04, -5),
      ecosystemQuality: 23.9,
      climateChange: 52.5,
      resources: 821
    },
    operatingOneMin: {
      humanHealth: Math.pow(1.4, -10),
      ecosystemQuality: Math.pow(6.44, -5),
      climateChange: 0.000111,
      resources: 0.0288
    },
    // TODO: check in specific article
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  TV_SCREEN_BASE: {
    name: 'TV_SCREEN_BASE',
    french: 'télévision sauf écran',
    operatingOneMin: {
      humanHealth: Math.pow(2.07, -11),
      ecosystemQuality: Math.pow(9.54, -6),
      climateChange: Math.pow(1.65, -5),
      resources: 0.00426
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  TV_SCREEN: {
    name: 'TV_SCREEN',
    french: 'écran de télévision',
    operatingOneMinOneMeterSquare: {
      humanHealth: Math.pow(1.78, -10),
      ecosystemQuality: Math.pow(8.21, -5),
      climateChange: 0.000142,
      resources: 0.0367
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  /**
   * VISIO-CONFERENCE KIT
   */
  LOGITECH_KIT: {
    name: 'LOGITECH_KIT',
    french: 'kit Logitech',
    standbyOneMin: {
      humanHealth: Math.pow(5.9, -12),
      ecosystemQuality: Math.pow(2.72, -6),
      climateChange: Math.pow(4.7, -6),
      resources: 0.00121
    },
    operatingOneMin: {
      humanHealth: Math.pow(8.8, -12),
      ecosystemQuality: Math.pow(4.06, -6),
      climateChange: Math.pow(7.02, -6),
      resources: 0.00181
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  LOGITECH_KIT_CAMERA: {
    name: 'LOGITECH_KIT_CAMERA',
    french: 'caméra du kit Logitech',
    operatingOneMin: {
      humanHealth: Math.pow(4.04, -12),
      ecosystemQuality: Math.pow(1.86, -6),
      climateChange: Math.pow(3.22, -6),
      resources: 0.000831
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  LOGITECH_CABLE: {
    name: 'LOGITECH_CABLE',
    french: 'câble Logitech',
    embodied: {
      humanHealth: Math.pow(3.53, -6),
      ecosystemQuality: 3.37,
      climateChange: 1.16,
      resources: 18.5
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  METAL_STRUCTURE: {
    name: 'METAL_STRUCTURE',
    french: 'structure métallique de support des écrans',
    embodied: {
      humanHealth: 0.000141,
      ecosystemQuality: 20.5,
      climateChange: 107,
      resources: Math.pow(1.18, 3)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  /** CODEC **/
  CODEC_LOWER: {
    name: 'CODEC_LOWER',
    french: 'CODEC bas de gamme',
    operatingOneMin: {
      humanHealth: Math.pow(2.69, -11),
      ecosystemQuality: Math.pow(1.24, -5),
      climateChange: Math.pow(2.15, -5),
      resources: 0.00554
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  CODEC_UPPER: {
    name: 'CODEC_UPPER',
    french: 'CODEC haut de gamme',
    operatingOneMin: {
      humanHealth: Math.pow(8.28, -11),
      ecosystemQuality: Math.pow(3.82, -5),
      climateChange: Math.pow(6.6, -5),
      resources: 0.017
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  /** CABLES ***/
  // Reference value for HDMI and VGA
  POWER_CABLE_ONE_METER: {
    name: 'POWER_CABLE_ONE_METER',
    french: 'câble d\'alimentation 1 m',
    embodied: {
      humanHealth: Math.pow(8.8, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  ETHERNET_CABLE_ONE_METER: {
    name: 'ETHERNET_CABLE_ONE_METER',
    french: 'câble Ethernet 1 m',
    embodied: {
      humanHealth: Math.pow(1.42, -7),
      ecosystemQuality: 0.0999,
      climateChange: 0.0534,
      resources: 1.06
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  HDMI_CABLE_ONE_METER: {
    name: 'HDMI_CABLE_ONE_METER',
    french: 'câble HDMI 1 m',
    embodied: {
      humanHealth: Math.pow(8.8, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  JACK_CABLE_ONE_METER: {
    name: 'JACK_CABLE_ONE_METER',
    french: 'câble jack 1 m',
    embodied: {
      humanHealth: Math.pow(1.7, -6),
      ecosystemQuality: 1.63,
      climateChange: 0.551,
      resources: 8.73
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  VGA_CABLE_ONE_METER: {
    name: 'VGA_CABLE_ONE_METER',
    french: 'câble VGA 1 m',
    embodied: {
      humanHealth: Math.pow(8.8, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  }
}

module.exports = hardware
