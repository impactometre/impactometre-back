'use strict'

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
    this._user = user
  }

  /**
   * Getter of the user who creates the scenario.
   */
  get user () {
    return this._user
  }

  /**
   * Setter of the user who creates the scenario.
   */
  set user (user) {
    this._user = user
  }
}

module.exports = Scenario
