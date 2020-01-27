'use strict'

const express = require('express')
const resultsRouter = require('./results')

const router = express.Router()

router.get('/', function (req, res, next) {
  res.redirect('/reunion/resultats')
})

router.use('/resultats', resultsRouter)

module.exports = router
