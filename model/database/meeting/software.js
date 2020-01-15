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
    }
  },
  JITSI: {
    /* Measured for 3 people1 000 000 KB received by all
    - 1 000 000 kBytes received by all people for 15 minutes
    - 66 666 kBystes received each minute by all people
    - 8 888 kbits received each seconde by all people
    - 2963 kbits received each second by each people
    */
    french: 'JitsDi',
    bandwith: {
      inbound: 2963
    }
  },
  HANGOUTS: {
    french: 'Google Hangouts',
    // Source : https://support.google.com/hangouts/answer/2944865?co=GENIE.Platform%3DDesktop&hl=en
    bandwith: {
      inbound: {
        2: {
          lower: 300,
          upper: 2600
        },
        5: {
          lower: 300,
          upper: 3200
        },
        10: {
          lower: 300,
          upper: 4000
        }
      }
    }
  }
}

module.exports = software
