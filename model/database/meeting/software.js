'use strict'

const software = {
  RENAVISIO: {
    french: 'Renavisio',
    // in Mo
    fileSize: 18.8,
    // in Kbits/s
    bandwith: {
      inbound: 1080
    }
  },
  SKYPE: {
    french: 'Skype',
    fileSize: 65.8,
    // Indexed by number of participants
    // Source : https://support.skype.com/fr/faq/FA1417/quelle-est-la-quantite-de-bande-passante-necessaire-a-skype
    bandwith: {
      inbound: {
        2: {
          minimum: 30,
          ideal: 1050
        },
        3: {
          minimum: 512,
          ideal: 2000
        },
        5: {
          minimum: 2000,
          ideal: 4000
        },
        // 7 or more
        7: {
          minimum: 4000,
          ideal: 8000
        }
      }
    }
  },
  JITSI: {
    french: 'Jitsi',
    bandwith: {
      inbound: 'unknown'
    }
  },
  HANGOUTS: {
    french: 'Google Hangouts',
    // Source : https://support.google.com/hangouts/answer/2944865?co=GENIE.Platform%3DDesktop&hl=en
    bandwith: {
      inbound: {
        2: {
          minimum: 300,
          ideal: 2600
        },
        5: {
          minimum: 300,
          ideal: 3200
        },
        10: {
          minimum: 300,
          ideal: 4000
        }
      }
    }
  }
}

module.exports = software
