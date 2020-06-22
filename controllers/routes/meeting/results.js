'use strict';

const express = require('express');

const meetingScenarios = require('../../../database/meeting/meetingScenarios');
const { normaliseDamages } = require('../../../utils/normalise');

const router = express.Router();

router.get('/:userId', function (req, res, next) {
  const userId = req.params.userId;

  const scenarios = [];
  meetingScenarios.forEach(scenario => {
    if (scenario.user === userId) {
      scenarios.push(scenario)
    }
  });

  const normalisedDamages = normaliseDamages(scenarios);

  res.render('meeting/results/results', { title: 'Résultats', scenarios, normalisedDamages })
});

module.exports = router;
