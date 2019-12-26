'use strict'

class Meeting {
  /**
   * Create a meeting.
   * @param {String} user - The user who creates the meeting.
   * @param {Array<Journey>} journeys - All the journeys entered by the user.
   * @param {Array<HardwareUsage>} hardware  - The different kinds of hardware device used for the meeting and their number.
   * @param {SoftwareUsage} software - The software used for the meeting and its number of instances.
   */
  constructor (user, journeys, hardware, software) {
    this.user = user
    this.journeys = journeys
    this.hardware = hardware
    this.software = software
  }
}

module.exports = Meeting
