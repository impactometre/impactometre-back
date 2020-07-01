'use strict';

const express = require('express');
const app = express();

// const hardwareDb = require('../../database/meeting/hardware');
// const softwareDb = require('../../database/meeting/software');
// const transportationMeanDb = require('../../database/meeting/transportationMean');
const MeetingScenario = require('../../model/classes/meeting/MeetingScenario');
// const { meetingCategoryDamage, bounds } = require('../../constants/meeting');

function payloadStructureIsCorrect () {
  // TODO check payload structure
  return false;
}

app.post('/meeting', async (req, res) => {
  const scenarios = req.body;
  if (!payloadStructureIsCorrect(scenarios)) {
    const mockupResponse = {
      comparaison: [
        [
          {
            "damageEndpoint":"HUMAN_HEALTH",
            "meetingScenario":"6mp34fkc3fqrkm",
            "value":2,
            "hardware":1,
            "software":0.5,
            "journey":0.5
          },
          {
            "damageEndpoint":"HUMAN_HEALTH",
            "meetingScenario":"6mp34fkc3fqrlf",
            "value":3,
            "hardware":1,
            "software":1,
            "journey":1
          }
        ],
        [
          {
            "damageEndpoint":"ECOSYSTEM_QUALITY",
            "meetingScenario":"6mp34fkc3fqrkm",
            "value":4,
            "hardware":1,
            "software":2,
            "journey":1
          },
          {
            "damageEndpoint":"ECOSYSTEM_QUALITY",
            "meetingScenario":"6mp34fkc3fqrlf",
            "value":4,
            "hardware":2,
            "software":1,
            "journey":1
          }
        ],
        [
          {
            "damageEndpoint":"CLIMATE_CHANGE",
            "meetingScenario":"6mp34fkc3fqrkm",
            "value":5,
            "hardware":0,
            "software":1,
            "journey":4
          },
          {
            "damageEndpoint":"CLIMATE_CHANGE",
            "meetingScenario":"6mp34fkc3fqrlf",
            "value":4,
            "hardware":3,
            "software":0.5,
            "journey":0.5
          }
        ],
        [
          {
            "damageEndpoint":"RESOURCES",
            "meetingScenario":"6mp34fkc3fqrkm",
            "value":2,
            "hardware":0.5,
            "software":0.5,
            "journey":1
          },
          {
            "damageEndpoint":"RESOURCES",
            "meetingScenario":"6mp34fkc3fqrlf",
            "value":2,
            "hardware":1,
            "software":0.5,
            "journey":0.5
          }
        ]
      ],
      equivalents: []
    };
    return res.json(mockupResponse);
    // const errorMessage = { error: 400, message: 'Bad request. Your request contains bad syntax and cannot be processed.' };
    // return res.status(400).json(errorMessage);
  } else {
    console.log('INIT');
    const computedScenarios = await computeScenarios(scenarios);
    const normalisedDamages = await normaliseDamages(computedScenarios);
    return res.json(normalisedDamages);
  }
});

async function computeScenarios (scenarios) {
  let computedScenarios = [];
  for await (const scenario of scenarios) {
    const s = new MeetingScenario(scenario);
    const computingProperties = {
      hardware: { meetingDuration: scenario.meetingDuration, bounds: 'upper' },
      software: { instancesNumber: scenario.numberOfParticipants, bandwithBound: 'upper', networkBound: 'upper', meetingDuration: scenario.meetingDuration },
      journey: {}
    };
    const damage = await s.computeDamage(computingProperties);
    computedScenarios.push(s);
  };

  return Promise.resolve(computedScenarios);
}
const { normaliseDamages } = require('../../utils/normalise');

module.exports = app;
