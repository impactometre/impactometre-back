'use strict'

/**
 * This class discribed a kind of software device
 * entered by the user, with its number of instances used for the meetings.
 */
class SoftwareEntered {
  /**
   * The SoftwareEntered class constructor.
   * @param {software} software The kind of software used.
   * @param {Integer} numberOfInstances Its number of instances entered by the user.
   */
  constructor (software, numberOfInstances) {
    this.software = software
    this.numberOfInstances = numberOfInstances
  }
}

module.exports = SoftwareEntered
