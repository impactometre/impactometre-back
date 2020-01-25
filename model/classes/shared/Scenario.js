'use strict'

const uniqid = require('uniqid')

/**
 * Abstract class Scenario.
 */
class Scenario {
  /**
   * Create scenario general attributes.
   * @param {String} user - The user who creates the scenario.
   */
  constructor (user) {
    if (new.target === Scenario) throw TypeError('Cannot create instance of Scenario because abstract class')
    this._id = uniqid()
    this._user = user
  }

  // Getters

  /**
   * Getter of the user who creates the scenario.
   */
  get user () {
    return this._user
  }

  /**
   * Getter of the scenario id.
   */
  get id () {
    return this._id
  }

  // Setters

  /**
   * Setter of the user who creates the scenario.
   */
  set user (user) {
    this._user = user
  }

  // Other methods
}

module.exports = Scenario
