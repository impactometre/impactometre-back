'use strict'

const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Impactometre' })
})

router.get('/reunion', function (req, res, next) {
  res.render('meeting/form', { title: 'Votre réunion' })
})

module.exports = router
