'use strict'

const express = require('express')
const resultsRouter = require('./results')

const router = express.Router()

const transportationMean = require('../../../database/meeting/transportationMean')

router.get('/', function (req, res, next) {
  res.redirect('/reunion/commencer')
})

router.get('/commencer', function (req, res, next) {
  res.render('meeting/form/form', { title: 'Votre réunion', transportationMean })
})

router.use('/resultats', resultsRouter)

module.exports = router
