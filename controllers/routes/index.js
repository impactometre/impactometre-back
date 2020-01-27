'use strict'

const express = require('express')
const router = express.Router()

const transportationMean = require('../../database/meeting/transportationMean')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Impactometre' })
})

router.get('/reunion', function (req, res, next) {
  res.render('meeting/form/form', { title: 'Votre réunion', transportationMean })
})

module.exports = router
