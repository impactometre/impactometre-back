'use strict'

const express = require('express')
const hardwareDatabase = require('../../../database/meeting/hardware')
const softwareDatabase = require('../../../database/meeting/software')
const transportDatabase = require('../../../database/meeting/transportationMean')
const meetingScenarios = require('../../../database/meeting/meetingScenarios')
const MeetingScenario = require('../../../model/classes/meeting/MeetingScenario')
const { meetingCategoryDamage, bounds } = require('../../../constants/meeting')
const { normaliseDamages } = require('../../../utils/normalise')

const router = express.Router()

router.get('/', function (req, res, next) {
  // The user who creates the meeting
  const user = 'vlegauch'
  // The meeting duration in minutes
  const meetingDuration = 120
  // Number of participants
  const numberOfParticipants = 4
  // The JSON object that enables to creates components linked to the meeting
  const payload = {
    [meetingCategoryDamage.HARDWARE]: [
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.LAPTOP.name },
      { name: hardwareDatabase.LOGITECH_KIT.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.METAL_STRUCTURE.name }
    ],
    [meetingCategoryDamage.SOFTWARE]: [{ name: softwareDatabase.SKYPE.name }],
    [meetingCategoryDamage.JOURNEY]: [
      {
        passenger: 'Passenger 1',
        mean: transportDatabase.CAR_ELECTRIC_ONE_KM.name,
        distance: 120,
        numberOfPeople: 4
      },
      {
        passenger: 'Passenger 1',
        mean: transportDatabase.BUS_LARGE_DISTANCE_ONE_PERSON_KM.name,
        distance: 40,
        numberOfPeople: 1
      },
      {
        passenger: 'Passenger 2',
        mean: transportDatabase.CAR_ELECTRIC_ONE_KM.name,
        distance: 120,
        numberOfPeople: 4
      },
      {
        passenger: 'Passenger 2',
        mean: transportDatabase.TRAIN_REGIONAL_ONE_PERSON_KM.name,
        distance: 300,
        numberOfPeople: 1
      },
      {
        passenger: 'Passenger 2',
        mean: transportDatabase.BIKE_ONE_PERSON_ONE_KM.name,
        distance: 10,
        numberOfPeople: 1
      }
    ]
  }

  meetingScenarios.clear()
  // Create the MeetingScenario object
  const meetingScenario = MeetingScenario.create({ user, meetingDuration, numberOfParticipants, payload })

  const damageComputePayload = {
    [meetingCategoryDamage.HARDWARE]: { meetingDuration: 120, bound: bounds.UPPER },
    [meetingCategoryDamage.SOFTWARE]: { instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 120 },
    [meetingCategoryDamage.JOURNEY]: {}
  }

  meetingScenario.computeDamage(damageComputePayload)

  meetingScenario.generateAlternatives()

  const scenarios = []
  meetingScenarios.forEach(scenario => {
    if (scenario.user === user) {
      scenarios.push(scenario)
    }
  })

  const normalisedDamages = normaliseDamages(scenarios)

  res.render('meeting/results/results', { title: 'Résultats', scenarios, normalisedDamages })
})

module.exports = router
