'use strict'

export const meetingEquipment = {
  KEYBOARD: {
    french: 'clavier',
    embodied: {
      humanHealth: Math.pow(5.01, -5),
      ecosystemQuality: 19.6,
      climateChange: 31.5,
      resources: 453
    }
  },
  COMPUTER_MOUSE: {
    french: 'souris',
    embodied: {
      humanHealth: Math.pow(1.06, -5),
      ecosystemQuality: 4.73,
      climateChange: 6.56,
      resources: 93.5
    }
  },
  COMPUTER_TOWER: {
    french: 'tour',
    embodied: {
      humanHealth: 0.000349,
      ecosystemQuality: 131,
      climateChange: 228,
      resources: Math.pow(3.19, 3)
    }
  },
  POWER_CABLE_ONE_METER: {
    french: 'câble d\'alimentation 1 m',
    embodied: {
      humanHealth: Math.pow(8.8, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    }
  },
  ETHERNET_CABLE_ONE_METER: {
    french: 'câble Ethernet 1 m',
    embodied: {
      humanHealth: Math.pow(1.42, -7),
      ecosystemQuality: 0.0999,
      climateChange: 0.0534,
      resources: 1.06
    }
  },
  HDMI_CABLE_ONE_METER: {
    french: 'câble HDMI 1 m',
    embodied: {
      humanHealth: Math.pow(8.8, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    }
  },
  JACK_CABLE_ONE_METER: {
    french: 'câble jack 1 m',
    embodied: {
      humanHealth: Math.pow(1.7, -6),
      ecosystemQuality: 1.63,
      climateChange: 0.551,
      resources: 8.73
    }
  },
  LOGITECH_CABLE: {
    french: 'câble Loitech',
    embodied: {
      humanHealth: Math.pow(3.53, -6),
      ecosystemQuality: 3.37,
      climateChange: 1.16,
      resources: 18.5
    }
  },
  VGA_CABLE_ONE_METER: {
    french: 'câble VGA 1 m',
    embodied: {
      humanHealth: Math.pow(8.8, -7),
      ecosystemQuality: 0.59,
      climateChange: 0.34,
      resources: 6.83
    }
  },
  CAMERA: {
    french: 'caméra',
    operatingOneMin: {
      humanHealth: Math.pow(9.84, -12),
      ecosystemQuality: Math.pow(4.53, -6),
      climateChange: Math.pow(7.84, -6),
      resources: 0.00202
    }
  },
  CODEC_LOWER: {
    french: 'CODEC bas de gamme',
    operatingOneMin: {
      humanHealth: Math.pow(2.69, -11),
      ecosystemQuality: Math.pow(1.24, -5),
      climateChange: Math.pow(2.15, -5),
      resources: 0.00554
    }
  },
  CODEC_UPPER: {
    french: 'CODEC haut de gamme',
    operatingOneMin: {
      humanHealth: Math.pow(8.28, -11),
      ecosystemQuality: Math.pow(3.82, -5),
      climateChange: Math.pow(6.6, -5),
      resources: 0.017
    }
  },
  DESKTOP_WITHOUT_SCREEN: {
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
    }
  },
  DESKTOP: {
    french: 'ordinateur fixe',
    operatingOneMin: {
      humanHealth: Math.pow(1.55, -10),
      ecosystemQuality: Math.pow(7.16, -5),
      climateChange: 0.000124,
      resources: 0.032
    }
  },
  DESKTOP_SCREEN_LCD: {
    french: 'écran d\'ordinateur LCD',
    embodied: {
      humanHealth: 0.000475,
      ecosystemQuality: 140,
      climateChange: 360,
      resources: Math.pow(4.79, 3)
    }
  },
  TV_SCREEN_BASE: {
    french: 'télévision sauf écran',
    operatingOneMin: {
      humanHealth: Math.pow(2.07, -11),
      ecosystemQuality: Math.pow(9.54, -6),
      climateChange: Math.pow(1.65, -5),
      resources: 0.00426
    }
  },
  TV_SCREEN: {
    french: 'écran de télévision',
    operatingOneMinOneMeterSquare: {
      humanHealth: Math.pow(1.78, -10),
      ecosystemQuality: Math.pow(8.21, -5),
      climateChange: 0.000142,
      resources: 0.0367
    }
  },
  INTERNET_ACCESS_EQUIPMENT: {
    french: "équipement d'accès Internet",
    embodied: {
      humanHealth: Math.pow(1.26, -5),
      ecosystemQuality: 5.6,
      climateChange: 7.21,
      resources: 103
    }
  },
  LOGITECH_KIT_CAMERA: {
    french: 'caméra du kit Logitech',
    operatingOneMin: {
      humanHealth: Math.pow(4.04, -12),
      ecosystemQuality: Math.pow(1.86, -6),
      climateChange: Math.pow(3.22, -6),
      resources: 0.000831
    }
  },
  LOGITECH_KIT: {
    french: 'kit Logitech',
    sleep: {
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
    }
  },
  LAPTOP: {
    french: 'ordinateur fixe',
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
    }
  },
  MICROPHONE: {
    french: 'micro',
    operatingOneMin: {
      humanHealth: Math.pow(2.59, -12),
      ecosystemQuality: Math.pow(1.19, -6),
      climateChange: Math.pow(2.06, -6),
      resources: 0.000533
    }
  },
  NETWORK_ENERGETIC_INTENSITY_LOWER: {
    french: 'intensité énergétique du réseau (estimation basse)',
    operatingOneBit: {
      humanHealth: Math.pow(1.68, -17),
      ecosystemQuality: Math.pow(7.76, -12),
      climateChange: Math.pow(1.34, -11),
      resources: Math.pow(3.47, -9)
    }
  },
  NETWORK_ENERGETIC_INTENSITY_UPPER: {
    french: 'intensité énergétique du réseau (estimation haute)',
    operatingOneBit: {
      humanHealth: Math.pow(2.8, -17),
      ecosystemQuality: Math.pow(1.29, -11),
      climateChange: Math.pow(2.23, -11),
      resources: Math.pow(5.77, -9)
    }
  },
  PROJECTOR: {
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
    }
  },
  METAL_STRUCTURE: {
    french: 'structure métallique de support des écrans',
    embodied: {
      humanHealth: 0.000141,
      ecosystemQuality: 20.5,
      climateChange: 107,
      resources: Math.pow(1.18, 3)
    }
  },
  RENAVISIO: {
    french: 'Renavisio',
    // in Mo
    fileSize: 18.8,
    // in Kbits/s
    downloadSpeed: 1080
  },
  SKYPE: {
    french: 'Skype',
    fileSize: 65.8,
    // Indexed by number of participants
    // Source : https://support.skype.com/fr/faq/FA1417/quelle-est-la-quantite-de-bande-passante-necessaire-a-skype
    downloadSpeed: {
      2: {
        lower: 30,
        upper: 1050
      },
      3: {
        lower: 512,
        upper: 2000
      },
      5: {
        lower: 2000,
        upper: 4000
      },
      // 7 or more
      7: {
        lower: 4000,
        upper: 8000
      }
    }
  },
  JITSI: {
    french: 'Jitsi',
    fileSize: 36.21,
    downloadSpeed: 'unknown'
  },
  PLANE_INTERCONTINENTAL_ONE_PERSON_KM: {
    french: 'avion intercontinental',
    embodied: {
      humanHealth: Math.pow(5.85, -8),
      ecosystemQuality: 0.0108,
      climateChange: 0.109,
      resources: 1.69
    }
  },
  PLANE_INTRACONTINENTAL_ONE_PERSON_KM: {
    french: 'avion intracontinental',
    embodied: {
      humanHealth: Math.pow(8.75, -8),
      ecosystemQuality: 0.0163,
      climateChange: 0.167,
      resources: 2.59
    }
  },
  BUS_LARGE_DISTANCE_ONE_PERSON_KM: {
    french: 'bus longue distance',
    embodied: {
      humanHealth: Math.pow(1.3, -7),
      ecosystemQuality: 0.0354,
      climateChange: 0.099,
      resources: 1.49
    }
  },
  BUS_CITY_ONE_PERSON_KM: {
    french: 'bus en ville',
    embodied: {
      humanHealth: Math.pow(6.13, -8),
      ecosystemQuality: 0.0214,
      climateChange: 0.0497,
      resources: 0.764
    }
  },
  CAR_ELECTRIC_ONE_KM: {
    french: 'voiture électrique',
    embodied: {
      humanHealth: Math.pow(1.3, -7),
      ecosystemQuality: 0.0354,
      climateChange: 0.099,
      resources: 1.49
    }
  },
  CAR_HEAT_ENGINE_ONE_KM: {
    french: 'voiture moteur thermique',
    embodied: {
      humanHealth: Math.pow(2.58, -7),
      ecosystemQuality: 0.086,
      climateChange: 0.325,
      resources: 5.04
    }
  },
  TRAIN_HIGH_SPEED_ONE_PERSON_KM: {
    french: 'train à grande vitesse',
    embodied: {
      humanHealth: Math.pow(1.76, -8),
      ecosystemQuality: 0.00844,
      climateChange: 0.0122,
      resources: 1.15
    }
  },
  TRAIN_REGIONAL_ONE_PERSON_KM: {
    french: 'train régional',
    embodied: {
      humanHealth: Math.pow(1.5, -8),
      ecosystemQuality: 0.00736,
      climateChange: 0.0106,
      resources: 0.8
    }
  },
  TRAIN_URBAN_ONE_PERSON_KM: {
    french: 'train urbain',
    embodied: {
      humanHealth: Math.pow(1.34, -8),
      ecosystemQuality: 0.00505,
      climateChange: 0.0106,
      resources: 0.477
    }
  },
  TRAMWAY_ONE_PERSON_KM: {
    french: 'tramway',
    embodied: {
      humanHealth: Math.pow(3.93, -8),
      ecosystemQuality: 0.00887,
      climateChange: 0.0341,
      resources: 0.921
    }
  },
  BIKE_ONE_PERSON_ONE_KM: {
    french: 'vélo',
    embodied: {
      humanHealth: Math.pow(1.6, -8),
      ecosystemQuality: 0.00251,
      climateChange: 0.0131,
      resources: 0.169
    }
  }
}
