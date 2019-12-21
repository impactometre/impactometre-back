'use strict'

import { Router } from 'express'
var router = Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Impactometre' })
})

export default router
