'use strict'

const {
  hardwareLifetime,
  hardwareOperatingTimePerDay,
  meetingComponents
} = require('../../constants/meeting')

const hardware = {
  /**
   * ASSIMILATION CANDIDATES
   * If we cannot have the damage values directly
   * from Ecovinvent database, we assimilate the damage
   * caused by the object to the damage caused by a known
   * object.
   */
  ASSIMILATION_COMPUTER_TOWER_1G: {
    name: 'ASSIMILATION_COMPUTER_TOWER_1G',
    french: '1 g d\'une tour d\'ordinateur',
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.004353982,
      ecosystemQuality: 0.000843363,
      climateChange: 0.002035398,
      resources: 0.00185841
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  /**
   * DESKTOP AND LAPTOP
   * */
  DESKTOP: {
    name: 'DESKTOP',
    french: 'ordinateur fixe',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    components: {
      DESKTOP_TOWER: 1,
      COMPUTER_MOUSE: 1,
      COMPUTER_SCREEN_LCD: 1,
      COMPUTER_KEYBOARD: 1
    }
  },
  DESKTOP_TOWER: {
    name: 'DESKTOP_TOWER',
    french: 'tour d\'ordinateur',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.000349,
      ecosystemQuality: 131,
      climateChange: 228,
      resources: 3.19 * Math.pow(10, 3)
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
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  COMPUTER_SCREEN_LCD: {
    name: 'COMPUTER_SCREEN_LCD',
    french: 'écran d\'ordinateur LCD',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.000475,
      ecosystemQuality: 140,
      climateChange: 360,
      resources: 4.79 * Math.pow(10, 3)
    },
    operatingOneMinVisio: {
      humanHealth: 1.04 * Math.pow(10, -11),
      ecosystemQuality: 4.77 * Math.pow(10, -6),
      climateChange: 8.25 * Math.pow(10, -6),
      resources: 0.00213
    },
    operatingOneMinStandby: {
      humanHealth: 2.07 * Math.pow(10, -13),
      ecosystemQuality: 9.54 * Math.pow(10, -8),
      climateChange: 1.65 * Math.pow(10, -7),
      resources: 4.26 * Math.pow(10, -5)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  COMPUTER_KEYBOARD: {
    name: 'COMPUTER_KEYBOARD',
    french: 'clavier',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 5.01 * Math.pow(10, -5),
      ecosystemQuality: 19.6,
      climateChange: 31.5,
      resources: 453
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  COMPUTER_MOUSE: {
    name: 'COMPUTER_MOUSE',
    french: 'souris',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 1.06 * Math.pow(10, -5),
      ecosystemQuality: 4.73,
      climateChange: 6.56,
      resources: 93.5
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  LAPTOP: {
    name: 'LAPTOP',
    french: 'ordinateur portable',
    category: meetingComponents.HARDWARE,
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
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  /**
   * NETWORK ACCESS
   */
  INTERNET_ACCESS_EQUIPMENT: {
    name: 'INTERNET_ACCESS_EQUIPMENT',
    french: 'équipement d\'accès Internet',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 1.26 * Math.pow(10, -5),
      ecosystemQuality: 5.6,
      climateChange: 7.21,
      resources: 103
    },
    operatingOneMinVisio: {
      humanHealth: 1.097 * Math.pow(10, -8),
      ecosystemQuality: 0.0051,
      climateChange: 0.0087,
      resources: 2.2613
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  /**
   * PERIPHERALS
   */
  MICROPHONE: {
    name: 'MICROPHONE',
    french: 'micro',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodiedAssimilatedTo: 'ASSIMILATION_COMPUTER_TOWER_1G',
    // source: Jabra Speak 410 - https://www.jabra.fr/business/speakerphones/jabra-speak-series/jabra-speak-410#/#7410-209
    weight: 180.3,
    operatingOneMinVisio: {
      humanHealth: 2.59 * Math.pow(10, -12),
      ecosystemQuality: 1.19 * Math.pow(10, -6),
      climateChange: 2.06 * Math.pow(10, -6),
      resources: 0.000533
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  CAMERA: {
    name: 'CAMERA',
    french: 'caméra',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    // lower weight source: Logitech C920 HD Pro Webcam
    // https://support.logi.com/hc/fr/articles/360023307294-C920-Caract%C3%A9ristiques-techniques
    // upper weight source: Logitech PTZ PRO 2 (camera: 580g, remote: 68g)
    // https://www.logitech.com/assets/65113/2/conferencecam-ptz-pro2-datasheet.FRA.pdf
    weight: {
      lower: 162,
      upper: 628
    },
    embodiedAssimilatedTo: 'ASSIMILATION_COMPUTER_TOWER_1G',
    operatingOneMinVisio: {
      humanHealth: 9.84 * Math.pow(10, -12),
      ecosystemQuality: 4.53 * Math.pow(10, -6),
      climateChange: 7.84 * Math.pow(10, -6),
      resources: 0.00202
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  PROJECTOR: {
    name: 'PROJECTOR',
    french: 'projecteur',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 8.04 * Math.pow(10, -5),
      ecosystemQuality: 23.9,
      climateChange: 52.5,
      resources: 821
    },
    operatingOneMinVisio: {
      upper: {
        humanHealth: 2.67 * Math.pow(10, -10),
        ecosystemQuality: 0.000123,
        climateChange: 0.000213,
        resources: 0.055
      },
      lower: {
        humanHealth: 8.12 * Math.pow(10, -11),
        ecosystemQuality: 3.74 * Math.pow(10, -5),
        climateChange: 6.47 * Math.pow(10, -5),
        resources: 0.0167
      }
    },
    // TODO: check in specific article
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  TV_BASE: {
    name: 'TV_BASE',
    french: 'télévision sauf écran',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    operatingOneMinVisio: {
      humanHealth: 2.07 * Math.pow(10, -11),
      ecosystemQuality: 9.54 * Math.pow(10, -6),
      climateChange: 1.65 * Math.pow(10, -5),
      resources: 0.00426
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  TV_SCREEN: {
    name: 'TV_SCREEN',
    french: 'écran de télévision',
    category: meetingComponents.HARDWARE,
    // Damage is given for one meter square
    isSizeDependent: true,
    // Same as COMPUTER_SCREEN_LCD
    embodied: {
      humanHealth: 0.000475,
      ecosystemQuality: 140,
      climateChange: 360,
      resources: 4.79 * Math.pow(10, 3)
    },
    operatingOneMinVisio: {
      humanHealth: 1.78 * Math.pow(10, -10),
      ecosystemQuality: 8.21 * Math.pow(10, -5),
      climateChange: 0.000142,
      resources: 0.0367
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  TV: {
    name: 'TV',
    french: 'télévision',
    category: meetingComponents.HARDWARE,
    /* Even if a component (here TV_SCREEN) is size-dependent, we don't
    say that the composite element is itself size dependent */
    isSizeDependent: false,
    components: {
      TV_BASE: 1,
      TV_SCREEN: 1
    }
  },
  /**
   * VISIO-CONFERENCE KIT
   */
  LOGITECH_KIT_WITHOUT_CABLE: {
    // is composed of a camera, a hub, a speakerphone and a remote
    name: 'LOGITECH_KIT_WITHOUT_CABLE',
    french: 'kit Logitech sans les câbles',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    // camera = 670 g, hub = 170 g, speakerphone = 920g, remote = 51 g, TOTAL = 1811 g
    weight: 1811,
    embodiedAssimilatedTo: 'ASSIMILATION_COMPUTER_TOWER_1G',
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
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  LOGITECH_KIT_CABLE: {
    name: 'LOGITECH_KIT_CABLE',
    french: 'câble du kit Logitech',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 3.53 * Math.pow(10, -6),
      ecosystemQuality: 3.37,
      climateChange: 1.16,
      resources: 18.5
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  LOGITECH_KIT: {
    name: 'LOGITECH_KIT',
    french: 'kit de visioconférence Logitech',
    isSizeDependent: false,
    components: {
      LOGITECH_KIT_WITHOUT_CABLE: 1,
      LOGITECH_KIT_CABLE: 4
    }
  },
  METAL_STRUCTURE: {
    name: 'METAL_STRUCTURE',
    french: 'structure métallique de support des écrans',
    category: meetingComponents.HARDWARE,
    isSizeDependent: false,
    embodied: {
      humanHealth: 0.000141,
      ecosystemQuality: 20.5,
      climateChange: 107,
      resources: 1.18 * Math.pow(10, 3)
    },
    lifetime: hardwareLifetime.DESKTOP,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  /** CODEC **/
  CODEC: {
    name: 'CODEC',
    french: 'CODEC',
    category: meetingComponents.HARDWARE,
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
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  /** CABLES ***/
  // Reference value for HDMI and VGA
  POWER_CABLE_ONE_METER: {
    name: 'POWER_CABLE_ONE_METER',
    french: 'câble d\'alimentation 1 m sans fiches',
    category: meetingComponents.HARDWARE,
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.42 * Math.pow(10, -6),
      ecosystemQuality: 0.84,
      climateChange: 0.443,
      resources: 8.59
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  POWER_CABLE_PLUGS: {
    name: 'POWER_CABLE_PLUGS',
    french: 'fiches d\'un câble d\'alimentation',
    isSizeDependent: false,
    embodied: {
      humanHealth: 8.8 * Math.pow(10, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  POWER_CABLE: {
    name: 'POWER_CABLE',
    french: 'câble d\'alimentaion 1 m avec fiches',
    isSizeDependent: false,
    components: {
      POWER_CABLE_ONE_METER: 1,
      POWER_CABLE_PLUGS: 1
    }
  },
  ETHERNET_CABLE_ONE_METER: {
    name: 'ETHERNET_CABLE_ONE_METER',
    french: 'câble Ethernet 1 m sans fiches',
    category: meetingComponents.HARDWARE,
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.7 * Math.pow(10, -6),
      ecosystemQuality: 1.63,
      climateChange: 0.551,
      resources: 8.73
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
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
    operatingTimePerDay: hardwareOperatingTimePerDay.NOT_VISIO_DEDICATED
  },
  ETHERNET_CABLE: {
    name: 'ETHERNET_CABLE',
    french: 'câble Ethernet 1 m avec fiches',
    isSizeDependent: false,
    components: {
      ETHERNET_CABLE_ONE_METER: 1,
      ETHERNET_CABLE_PLUGS: 1
    }
  },
  HDMI_CABLE_ONE_METER: {
    name: 'HDMI_CABLE_ONE_METER',
    french: 'câble HDMI 1 m sans fiches',
    category: meetingComponents.HARDWARE,
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.42 * Math.pow(10, -6),
      ecosystemQuality: 0.84,
      climateChange: 0.443,
      resources: 8.59
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  HDMI_CABLE_PLUGS: {
    name: 'HDMI_CABLE_PLUGS',
    french: 'fiches de câble HDMI',
    isSizeDependent: false,
    embodied: {
      humanHealth: 8.8 * Math.pow(10, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  HDMI_CABLE: {
    name: 'HDMI_CABLE',
    french: 'câble HDMI 1 m avec fiches',
    isSizeDependent: false,
    components: {
      HDMI_CABLE_ONE_METER: 1,
      HDMI_CABLE_PLUGS: 1
    }
  },
  JACK_CABLE_ONE_METER: {
    name: 'JACK_CABLE_ONE_METER',
    french: 'câble jack 1 m',
    category: meetingComponents.HARDWARE,
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.7 * Math.pow(10, -6),
      ecosystemQuality: 1.63,
      climateChange: 0.551,
      resources: 8.73
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  VGA_CABLE_ONE_METER: {
    name: 'VGA_CABLE_ONE_METER',
    french: 'câble VGA 1 m',
    category: meetingComponents.HARDWARE,
    isSizeDependent: true,
    embodied: {
      humanHealth: 1.42 * Math.pow(10, -6),
      ecosystemQuality: 0.84,
      climateChange: 0.443,
      resources: 8.59
    },
    lifetime: hardwareLifetime.POWER_CABLE_ONE_METER,
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
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
    operatingTimePerDay: hardwareOperatingTimePerDay.VISIO_DEDICATED
  },
  VGA_CABLE: {
    name: 'VGA_CABLE',
    french: 'câble VGA 1 m avec fiches',
    isSizeDependent: false,
    components: {
      VGA_CABLE_ONE_METER: 1,
      VGA_CABLE_PLUGS: 1
    }
  }
}

module.exports = hardware
