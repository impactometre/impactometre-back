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

app.post('/meeting', async (req, res) => {
  const scenarios = req.body;
  if (!payloadStructureIsCorrect(scenarios)) {
    const errorMessage = { error: 400, message: 'Bad request. Your request contains bad syntax and cannot be processed.' };
    return res.status(400).json(errorMessage);
  } else {
    const normalisedDamages = await computeScenarios(scenarios).then(computedScenarios => normaliseDamages(computedScenarios));
    return res.json(normalisedDamages);
  }
});

async function computeScenarios (scenarios) {
  let computedScenarios = [];
  console.log(scenarios);
  for (const scenario of scenarios) {
    const s = new MeetingScenario(scenario);
    const computingProperties = {
      hardware: { meetingDuration: scenario.meetingDuration, bounds: 'upper' },
      software: { instancesNumber: scenario.numberOfParticipants, bandwithBound: 'upper', networkBound: 'upper', meetingDuration: scenario.meetingDuration },
      journey: {}
    };
    s.computeDamage(computingProperties);
    console.log('SCENARIO COMPUTÉ');
    console.log(s);
    computedScenarios.push(s);
  };
  console.log('-------------------');
  console.log(computedScenarios);
  console.log('-------------------');
  return Promise.resolve(computedScenarios);
}
const { normaliseDamages } = require('../../utils/normalise');

module.exports = app;
