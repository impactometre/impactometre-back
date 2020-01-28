'use strict'

const express = require('express')
const resultsRouter = require('./results')

const router = express.Router()

const hardwareDb = require('../../../database/meeting/hardware')
const softwareDb = require('../../../database/meeting/software')
const transportationMeanDb = require('../../../database/meeting/transportationMean')

router.get('/', function (req, res, next) {
  res.redirect('/reunion/commencer')
})

router.get('/commencer', function (req, res, next) {
  res.render('meeting/form/form', { title: 'Votre réunion', hardwareDb, softwareDb, transportationMeanDb })
})

router.post('/creer', (req, res) => {
  console.log(req.body)
  // The user who creates the meeting
  const user = 'vlegauch'
  // The meeting duration in minutes
  const { meetingDuration, softwareChoice } = req.body
  console.log(user, meetingDuration, softwareChoice)
})

router.use('/resultats', resultsRouter)

module.exports = router
