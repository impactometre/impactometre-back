'use strict';

const express = require('express');
const app = express();
const validate = require('jsonschema').validate;

const { formatExportService } = require('../../services/meeting');
const roundTo = require('round-to');

const equivalentDamages = {
  ONE_KM_CAR: {
    HUMAN_HEALTH: 0.00000025832141,
    ECOSYSTEM_QUALITY: 0.086025049,
    CLIMATE_CHANGE: 0.32539061,
    RESOURCES: 5.0408703
  }
};

const ACCEPTED_FORMAT = [
  'csv',
  'json',
];

// const hardwareDb = require('../../database/meeting/hardware');
// const softwareDb = require('../../database/meeting/software');
// const transportationMeanDb = require('../../database/meeting/transportationMean');
const MeetingScenario = require('../../model/classes/meeting/MeetingScenario');
// const { meetingCategoryDamage, bounds } = require('../../constants/meeting');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/meeting', async (req, res) => {
  const scenarios = req.body;

  if (!payloadStructureIsCorrect(scenarios)) {
    const errorMessage = { error: 400, message: 'Bad request. Your request contains bad syntax and cannot be processed.' };
    return res.status(400).json(errorMessage);
  } else {
    const computedScenarios = await computeScenarios(scenarios);
    const normalisedDamages = await normaliseDamages(computedScenarios);
    const equivalentDamages = await computeEquivalentDamages(computedScenarios);

    const responseBody = {
      comparison: normalisedDamages,
      equivalents: equivalentDamages
    };

    return res.json(responseBody);
  }
});

/** Route to get absolute values of scenarios damages */
app.get('/meeting/absolute-values', async (req, res) => {
  const {
    body: scenarios,
    query: {
      format = 'csv',
    },
  } = req;

  if (!ACCEPTED_FORMAT.includes(format)) {
    const errorMessage = { error: 400, message: 'Bad request. The requested export format is not acepted.' };
    return res.status(400).json(errorMessage);
  }

  const areScenariosValid = payloadStructureIsCorrect(scenarios);

  if (!areScenariosValid) {
    const errorMessage = { error: 400, message: 'Bad request. Your request contains bad syntax and cannot be processed.' };
    return res.status(400).json(errorMessage);
  }
  
  const computedScenarios = await computeScenarios(scenarios);

  if (format === 'json') {
    return res.status(200).json({ computedScenarios });
  }

  if (format === 'csv') {
    const csv = formatExportService(computedScenarios);
    res.contentType('text/csv');
    
    return res.status(200).send(csv);
  }
})

function payloadStructureIsCorrect (payload) {
  const schema = {
    id: '/PayloadValidationSchema',
    type: 'array',
    minItems: 1,
    maxItems: 3,
    items: {
      properties: {
        meetingScenario: {
          type: 'string',
          required: true
        },
        meetingDuration: {
          type: 'integer',
          required: true,
          minimum: 1
        },
        numberOfParticipants: {
          type: 'integer',
          required: true,
          minimum: 1
        },
        hardware: {
          type: 'array',
          required: true,
          items: {
            properties: {
              name: {
                type: 'string',
                required: true
              },
              french: {
                type: 'string'
              },
              qty: {
                type: 'integer',
                required: true,
                minimum: 0
              }
            }
          }
        },
        software: {
          type: 'object',
          required: true,
          properties: {
            name: {
              type: 'string'
            },
            numberOfInstances: {
              type: 'integer',
              required: true
            }
          }
        },
        journey: {
          type: 'array',
          required: true,
          items: {
            properties: {
              mean: {
                type: 'string',
                required: true
              },
              distance: {
                type: 'integer',
                minimum: 0,
                required: true
              }
            }
          }
        }
      }
    }
  };

  return validate(payload, schema).valid;
}

async function computeScenarios (scenarios) {
  const computedScenarios = [];
  for await (const scenario of scenarios) {
    const s = new MeetingScenario(scenario);
    const computingProperties = {
      hardware: { meetingDuration: scenario.meetingDuration, bounds: 'upper' },
      software: { instancesNumber: scenario.software.numberOfInstances, bandwithBound: 'upper', networkBound: 'upper', meetingDuration: scenario.meetingDuration },
      journey: {}
    };
    await s.computeDamage(computingProperties);
    computedScenarios.push(s);
  }

  return Promise.resolve(computedScenarios);
}
async function computeEquivalentDamages (scenarios) {
  const ret = {
    HUMAN_HEALTH: {},
    ECOSYSTEM_QUALITY: {},
    CLIMATE_CHANGE: {},
    RESOURCES: {}
  };
  const spheres = ['HUMAN_HEALTH', 'ECOSYSTEM_QUALITY', 'CLIMATE_CHANGE', 'RESOURCES'];
  for (const sphere of spheres) {
    for (const equivalent in equivalentDamages) {
      ret[sphere][equivalent] = {};
      for (const scenario of scenarios) {
        ret[sphere][equivalent][scenario.id] = roundTo(
          scenario.damage.totalDamage[sphere] / equivalentDamages[equivalent][sphere],
          1
        );
      }
    }
  }
  return Promise.resolve(ret);
}

const { normaliseDamages } = require('../../utils/normalise');

module.exports = app;
