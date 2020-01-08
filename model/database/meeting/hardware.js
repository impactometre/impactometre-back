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
    isSizeDependent: false,
    operatingOneMinVisio: {
      humanHealth: 1.55 * Math.pow(10, -10),
      ecosystemQuality: 7.16 * Math.pow(10, -5),
      climateChange: 0.000124,
      resources: 0.032
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  DESKTOP_WITHOUT_SCREEN: {
    name: 'DESKTOP_WITHOUT_SCREEN',
    french: 'ordinateur sans écran',
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.00041,
      ecosystemQuality: 155,
      climateChange: 266,
      resources: 3.74 * Math.pow(10, 3)
    },
    operatingWithoutVisioOneMin: {
      humanHealth: 1.66 * Math.pow(10, -11),
      ecosystemQuality: 7.63 * Math.pow(10, -6),
      climateChange: 1.32 * Math.pow(10, -5),
      resources: 0.00341
    },
    operatingOneMinVisio: {
      humanHealth: 3.42 * Math.pow(10, -11),
      ecosystemQuality: 1.57 * Math.pow(10, -5),
      climateChange: 2.72 * Math.pow(10, -5),
      resources: 0.00703
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  DESKTOP_SCREEN_LCD: {
    name: 'DESKTOP_SCREEN_LCD',
    french: 'écran d\'ordinateur LCD',
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.000475,
      ecosystemQuality: 140,
      climateChange: 360,
      resources: 4.79 * Math.pow(10, 3)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  COMPUTER_TOWER: {
    name: 'COMPUTER_TOWER',
    french: 'tour',
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.000349,
      ecosystemQuality: 131,
      climateChange: 228,
      resources: 3.19 * Math.pow(10, 3)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  KEYBOARD: {
    name: 'KEYBOARD',
    french: 'clavier',
    isSizeDependent: false,
    embodied: {
      humanHealth: 5.01 * Math.pow(10, -5),
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
    isSizeDependent: false,
    embodied: {
      humanHealth: 1.06 * Math.pow(10, -5),
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
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.000274,
      ecosystemQuality: 82.7,
      climateChange: 166,
      resources: 2.18 * Math.pow(10, 3)
    },
    operatingOneMinVisio: {
      humanHealth: 4.14 * Math.pow(10, -11),
      ecosystemQuality: 1.91 * Math.pow(10, -5),
      climateChange: 3.3 * Math.pow(10, -5),
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
    french: 'équipement d\'accès Internet',
    isSizeDependent: false,
    embodied: {
      humanHealth: 1.26 * Math.pow(10, -5),
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
    isSizeDependent: false,
    operatingOneMinVisio: {
      humanHealth: 2.59 * Math.pow(10, -12),
      ecosystemQuality: 1.19 * Math.pow(10, -6),
      climateChange: 2.06 * Math.pow(10, -6),
      resources: 0.000533
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  CAMERA: {
    name: 'CAMERA',
    french: 'caméra',
    isSizeDependent: false,
    operatingOneMinVisio: {
      humanHealth: 9.84 * Math.pow(10, -12),
      ecosystemQuality: 4.53 * Math.pow(10, -6),
      climateChange: 7.84 * Math.pow(10, -6),
      resources: 0.00202
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  PROJECTOR: {
    name: 'PROJECTOR',
    french: 'projecteur',
    isSizeDependent: false,
    embodied: {
      humanHealth: 8.04 * Math.pow(10, -5),
      ecosystemQuality: 23.9,
      climateChange: 52.5,
      resources: 821
    },
    operatingOneMinVisio: {
      humanHealth: 1.4 * Math.pow(10, -10),
      ecosystemQuality: 6.44 * Math.pow(10, -5),
      climateChange: 0.000111,
      resources: 0.0288
    },
    // TODO: check in specific article
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  TV_BASE: {
    name: 'TV_BASE',
    french: 'télévision sauf écran',
    isSizeDependent: false,
    operatingOneMinVisio: {
      humanHealth: 2.07 * Math.pow(10, -11),
      ecosystemQuality: 9.54 * Math.pow(10, -6),
      climateChange: 1.65 * Math.pow(10, -5),
      resources: 0.00426
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  TV_SCREEN: {
    name: 'TV_SCREEN',
    french: 'écran de télévision',
    // Damage is given for one meter square
    isSizeDependent: true,
    operatingOneMinVisio: {
      humanHealth: 1.78 * Math.pow(10, -10),
      ecosystemQuality: 8.21 * Math.pow(10, -5),
      climateChange: 0.000142,
      resources: 0.0367
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  TV: {
    name: 'TV',
    french: 'télévision',
    /* Even if a component (here TV_SCREEN) is size-dependent, we don't
    say that the composite element is itself size dependent */
    isSizeDependent: false,
    components: [
      'TV_BASE',
      'TV_SCREEN'
    ]
  },
  /**
   * VISIO-CONFERENCE KIT
   */
  LOGITECH_KIT: {
    name: 'LOGITECH_KIT',
    french: 'kit Logitech',
    isSizeDependent: false,
    operatingOneMinStandby: {
      humanHealth: 5.9 * Math.pow(10, -12),
      ecosystemQuality: 2.72 * Math.pow(10, -6),
      climateChange: 4.7 * Math.pow(10, -6),
      resources: 0.00121
    },
    operatingOneMinVisio: {
      humanHealth: 8.8 * Math.pow(10, -12),
      ecosystemQuality: 4.06 * Math.pow(10, -6),
      climateChange: 7.02 * Math.pow(10, -6),
      resources: 0.00181
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  LOGITECH_KIT_CAMERA: {
    name: 'LOGITECH_KIT_CAMERA',
    french: 'caméra du kit Logitech',
    isSizeDependent: false,
    operatingOneMinVisio: {
      humanHealth: 4.04 * Math.pow(10, -12),
      ecosystemQuality: 1.86 * Math.pow(10, -6),
      climateChange: 3.22 * Math.pow(10, -6),
      resources: 0.000831
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  LOGITECH_CABLE: {
    name: 'LOGITECH_CABLE',
    french: 'câble Logitech',
    isSizeDependent: false,
    embodied: {
      humanHealth: 3.53 * Math.pow(10, -6),
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
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.000141,
      ecosystemQuality: 20.5,
      climateChange: 107,
      resources: 1.18 * Math.pow(10, 3)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  /** CODEC **/
  CODEC: {
    name: 'CODEC',
    french: 'CODEC',
    isSizeDependent: false,
    operatingOneMinVisio: {
      upper: {
        humanHealth: 8.28 * Math.pow(10, -11),
        ecosystemQuality: 3.82 * Math.pow(10, -5),
        climateChange: 6.6 * Math.pow(10, -5),
        resources: 0.017
      },
      lower: {
        humanHealth: 2.69 * Math.pow(10, -11),
        ecosystemQuality: 1.24 * Math.pow(10, -5),
        climateChange: 2.15 * Math.pow(10, -5),
        resources: 0.00554
      }
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.LOGITECH_KIT
  },
  /** CABLES ***/
  // Reference value for HDMI and VGA
  POWER_CABLE_ONE_METER: {
    name: 'POWER_CABLE_ONE_METER',
    french: 'câble d\'alimentation 1 m',
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.42 * Math.pow(10, -6),
      ecosystemQuality: 0.84,
      climateChange: 0.443,
      resources: 8.59
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  POWER_CABLE_PLUGS: {
    name: 'POWER_CABLE_PLUGS',
    french: 'fiches d\'un câble d\'alimentation',
    isSizeDependent :false,
    embodied: {
      humanHealth: 8.8 * Math.pow(10, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  POWER_CABLE: {
    name: 'POWER_CABLE',
    french: 'câble d\'alimentaion 1 m avec fiches',
    isSizeDependent: false,
    components: [
      'POWER_CABLE_ONE_METER',
      'POWER_CABLE_PLUGS'
    ]
  },
  ETHERNET_CABLE_ONE_METER: {
    name: 'ETHERNET_CABLE_ONE_METER',
    french: 'câble Ethernet 1 m',
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.7 * Math.pow(10, -6),
      ecosystemQuality: 1.63,
      climateChange: 0.551,
      resources: 8.73
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  ETHERNET_CABLE_PLUGS: {
    name: 'ETHERNET_CABLE_PLUGS',
    french: 'fiches d\'un câble Ethernet',
    isSizeDependent: false,
    embodied: {
      humanHealth: 1.42 * Math.pow(10, -7),
      ecosystemQuality: 0.0999,
      climateChange: 0.0534,
      resources: 1.06
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  ETHERNET_CABLE: {
    name: 'ETHERNET_CABLE',
    french: 'câble Ethernet 1 m avec fiches',
    isSizeDependent: false,
    components: [
      'ETHERNET_CABLE_ONE_METER',
      'ETHERNET_CABLE_PLUGS'
    ]
  },
  HDMI_CABLE_ONE_METER: {
    name: 'HDMI_CABLE_ONE_METER',
    french: 'câble HDMI 1 m',
    isSizeDependent: true,
    embodied: {
      humanHealth: 8.8 * Math.pow(10, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  HDMI_CABLE_PLUGS: {
    name: 'HDMI_CABLE_PLUGS',
    french: 'fiches de câble HDMI',
    isSizeDependent: false,
    embodied: {
      humanHealth: 1.42 * Math.pow(10, -6),
      ecosystemQuality: 0.84,
      climateChange: 0.443,
      resources: 8.59
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  HDMI_CABLE: {
    name: 'HDMI_CABLE',
    french: 'câble HDMI 1 m avec fiches',
    isSizeDependent: false,
    components: [
      'HDMI_CABLE_ONE_METER',
      'HDMI_CABLE_PLUGS'
    ]
  },
  JACK_CABLE_ONE_METER: {
    name: 'JACK_CABLE_ONE_METER',
    french: 'câble jack 1 m',
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.7 * Math.pow(10, -6),
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
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.42 * Math.pow(10, -6),
      ecosystemQuality: 0.84,
      climateChange: 0.443,
      resources: 8.59
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  VGA_CABLE_PLUGS: {
    name: 'VGA_CABLE_PLUGS',
    french: 'fiches de câble VGA',
    isSizeDependent: false,
    embodied: {
      humanHealth: 8.8 * Math.pow(10, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.DESKTOP
  },
  VGA_CABLE: {
    name: 'VGA_CABLE',
    french: 'câble VGA 1 m avec fiches',
    isSizeDependent: false,
    components: [
      'VGA_CABLE_ONE_METER',
      'VGA_CABLE_PLUGS'
    ]
  }
}

module.exports = hardware
