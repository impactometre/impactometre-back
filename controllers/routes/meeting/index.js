'use strict'

const express = require('express')
const uniqid = require('uniqid')
const resultsRouter = require('./results')

const router = express.Router()

const hardwareDb = require('../../../database/meeting/hardware')
const softwareDb = require('../../../database/meeting/software')
const transportationMeanDb = require('../../../database/meeting/transportationMean')
const MeetingScenario = require('../../../model/classes/meeting/MeetingScenario')
const { meetingCategoryDamage, bounds } = require('../../../constants/meeting')

router.get('/', function (req, res, next) {
  res.redirect('/reunion/commencer')
})

router.get('/commencer', function (req, res, next) {
  res.render('meeting/form/form', { title: 'Votre réunion', hardwareDb, softwareDb, transportationMeanDb })
})

router.post('/creer', (req, res) => {
  const payload = JSON.parse(req.body.payload)
  // Generate an id for the user who creates the meeting
  const user = uniqid()
  payload.user = user

  console.log(payload)
  const meetingScenario = MeetingScenario.create(payload)

  const damageComputePayload = {
    [meetingCategoryDamage.HARDWARE]: { meetingDuration: payload.meetingDuration, bound: bounds.UPPER },
    [meetingCategoryDamage.SOFTWARE]: { instancesNumber: payload.numberOfParticipants, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: payload.meetingDuration },
    [meetingCategoryDamage.JOURNEY]: {}
  }

  meetingScenario.computeDamage(damageComputePayload)

  console.log('ICCCCCCCCCCCCCCCCCI')
  console.log(meetingScenario.damage.totalDamage)

  // Generates the two alternatives scenarios for the comparison
  meetingScenario.generateAlternatives()

  return res.json({ redirect: '/reunion/resultats/' + user })
})

router.use('/resultats', resultsRouter)

module.exports = router
