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
  return true;
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/meeting', async (req, res) => {
  // set CORS headers

  const scenarios = req.body;
  if (!payloadStructureIsCorrect(scenarios)) {
    const errorMessage = { error: 400, message: 'Bad request. Your request contains bad syntax and cannot be processed.' };
    return res.status(400).json(errorMessage);
  } else {
    console.log(scenarios);
    const computedScenarios = await computeScenarios(scenarios);
    const normalisedDamages = await normaliseDamages(computedScenarios);

    const responseBody = {
      comparison: normalisedDamages,
      equivalents: []
    };

    return res.json(responseBody);
  }
});

async function computeScenarios (scenarios) {
  const computedScenarios = [];
  for await (const scenario of scenarios) {
    const s = new MeetingScenario(scenario);
    const computingProperties = {
      hardware: { meetingDuration: scenario.meetingDuration, bounds: 'upper' },
      software: { instancesNumber: scenario.numberOfParticipants, bandwithBound: 'upper', networkBound: 'upper', meetingDuration: scenario.meetingDuration },
      journey: {}
    };
    await s.computeDamage(computingProperties);
    computedScenarios.push(s);
  };

  return Promise.resolve(computedScenarios);
}
const { normaliseDamages } = require('../../utils/normalise');

module.exports = app;
