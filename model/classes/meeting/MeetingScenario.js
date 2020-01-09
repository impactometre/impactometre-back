'use strict'

const Scenario = require('../shared/Scenario')

class MeetingScenario extends Scenario {
  /**
   * Create a scenario corresponding to a meeting.
   * @param {String} user - The user who creates the scenario.
   * @param {Map<string, Journey>} journeys - All the journeys entered by the user indexed by their ids.
   * @param {Hardware} hardware  - The different kinds of hardware device used for the meeting.
   * @param {Software} software - The software used for the meeting.
   * @param {Number} meetingDuration - The scenario duration in minutes.
   */
  constructor (user, journeys, hardware, software, meetingDuration) {
    super(user)
    this._journeys = journeys
    this._hardware = hardware
    this._software = software
    this._meetingDuration = meetingDuration
  }

  // Getters

  /**
   * Getter of all the journeys entered by the user indexed by their ids.
   * @see {Journey}
   */
  get journeys () {
    return this._journeys
  }

  /**
   * Getter of the different kinds of hardware device used for the meeting.
   * @see {Hardware}
   */
  get hardware () {
    return this._hardware
  }

  /**
   * Getter the software used for the scenario.
   * @see {Sofware}
   */
  get software () {
    return this._software
  }

  /**
   * Getter of the meeting duration in minutes.
   */
  get meetingDuration () {
    return this._meetingDuration
  }

  // Setters

  /**
   * Setter of all the journeys entered by the user indexed by their ids.
   * @see {Journey}
   */
  set journeys (journeys) {
    this._journeys = journeys
  }

  /**
   * Setter of the different kinds of hardware device used for the meeting.
   * @see {Hardware}
   */
  set hardware (hardware) {
    this._hardware = hardware
  }

  /**
   * Setter the software used for the meeting.
   * @see {Sofware}
   */
  set software (software) {
    this._software = software
  }

  /**
   * Setter of the meeting duration in minutes.
   */
  set meetingDuration (meetingDuration) {
    this._meetingDuration = meetingDuration
  }

  // Other methods
}

module.exports = MeetingScenario
