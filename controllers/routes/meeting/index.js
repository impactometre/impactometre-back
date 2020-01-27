'use strict'

const express = require('express')

const router = express.Router()

router.get('/results', function (req, res, next) {
  res.render('meeting/results', { title: 'Réunions' })
})

module.exports = router
