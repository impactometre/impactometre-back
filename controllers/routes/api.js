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

app.post('/meeting', (req, res) => {
  const scenarios = req.body;
  if (!payloadStructureIsCorrect(scenarios)) {
    const errorMessage = { error: 400, message: 'Bad request. Your request contains bad syntax and cannot be processed.' };
    return res.status(400).json(errorMessage);
  } else {
    const computedScenarios = scenarios.map(scenario => function (scenario) {
      const s = new MeetingScenario(scenario);
      return s.computeDamage(scenario);
    });

    const normalisedDamages = normaliseDamages(computedScenarios);
    return res.json(normalisedDamages);
  }
});

const { normaliseDamages } = require('../../utils/normalise');

module.exports = app;
