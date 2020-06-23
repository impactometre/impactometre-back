'use strict';

const express = require('express');
const app = express();

const hardwareDb = require('../../database/meeting/hardware');
const softwareDb = require('../../database/meeting/software');
const transportationMeanDb = require('../../database/meeting/transportationMean');
const MeetingScenario = require('../../model/classes/meeting/MeetingScenario');
const { meetingCategoryDamage, bounds } = require('../../constants/meeting');

function payloadStructureIsCorrect () {
  // TODO check payload structure
  return false;
}

app.post('/getDamagesForScenarios', (req, res) => {
  const scenarios = req.body;
  if (!payloadStructureIsCorrect(scenarios)) {
    const errorMessage = { error: 400, message: 'Server cannot process the request due to a malformed request syntax.' };
    return res.status(400).json(errorMessage);
  } else {
    const formattedScenarios = scenarios.map(scenario => function (scenario) {
      const damageComputePayload = {
        [meetingCategoryDamage.HARDWARE]: { meetingDuration: scenario.meetingDuration, bound: bounds.UPPER },
        [meetingCategoryDamage.SOFTWARE]: { meetingDuration: scenario.meetingDuration, instancesNumber: scenario.numberOfParticipants, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER },
        [meetingCategoryDamage.JOURNEY]: {}
      };
      return scenario.computeDamage(damageComputePayload);
    });

    const normalisedDamages = normaliseDamages(formattedScenarios);
    return res.json(normalisedDamages);
  }
});

const { normaliseDamages } = require('../../utils/normalise');

module.exports = app;
