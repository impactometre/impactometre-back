'use strict'

const software = {
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
  }
}

module.exports = software
