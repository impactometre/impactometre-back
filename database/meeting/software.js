'use strict';

const {
  meetingComponents
} = require('../../constants/meeting');

const software = {
  RENAVISIO: {
    name: 'RENAVISIO',
    french: 'Renavisio',
    category: meetingComponents.SOFTWARE,
    // in Mo
    fileSize: 18.8,
    // in Kbits/s
    bandwith: {
      inbound: 1080
    }
  },
  SKYPE: {
    name: 'SKYPE',
    french: 'Skype',
    category: meetingComponents.SOFTWARE,
    fileSize: 65.8,
    // Indexed by number of participants
    // Source : https://support.skype.com/fr/faq/FA1417/quelle-est-la-quantite-de-bande-passante-necessaire-a-skype
    bandwith: {
      inbound: {
        2: {
          lower: 128,
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
    name: 'JITSI',
    french: 'Jitsi',
    category: meetingComponents.SOFTWARE,
    /* Obtained summing size of all requests results when
    we load a launched Jitsi visioconference. Mean realized
    on visioconferences with 2, 3, 4 and 5 people.
    */
    fileSize: 2.04,
    /* Measured for 3 people
    - 1 000 000 kBytes received by all people for 15 minutes
    - 66 666 kBytes received each minute by all people
    - 8 888 kbits received each seconde by all people
    - 2963 kbits received each second by each people
    */
    bandwith: {
      inbound: 2963
    }
  },
  HANGOUTS: {
    name: 'HANGOUTS',
    french: 'Google Hangouts',
    category: meetingComponents.SOFTWARE,
    // Source : https://support.google.com/hangouts/answer/2944865?hl=fr
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
  },
  ZOOM: {
    name: 'ZOOM',
    french: 'Zoom',
    category: meetingComponents.SOFTWARE,
    // Source Zoom Mac archive (in Mo)
    fileSize: 25.5, 
    // Source: https://support.zoom.us/hc/en-us/articles/201362023-System-requirements-for-Windows-macOS-and-Linux (in kbits/s)
    bandwith: {
      inbound: {
        // See 1:1 meeting data
        2: {
          lower: 600,
          upper: 3000,
        },
        // See group video calling data
        3: {
          lower: 600,
          higher: 3000
        },
      }
    }
  }
};

module.exports = software;
