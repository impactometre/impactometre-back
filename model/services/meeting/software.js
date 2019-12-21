'use strict'
const softwareDatabase = require('../../database/meeting/software')

function get (name) {
  return softwareDatabase[name]
}

module.exports = { get }
