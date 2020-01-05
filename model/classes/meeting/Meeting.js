'use strict'

class Meeting {
  /**
   * Create a meeting.
   * @param {String} user - The user who creates the meeting.
   * @param {Map<string, Journey>} journeys - All the journeys entered by the user indexed by their ids.
   * @param {Hardware} hardware  - The different kinds of hardware device used for the meeting.
   * @param {Software} software - The software used for the meetings.
   * @param {Number} meetingDuration - The meeting duration in minutes.
   */
  constructor (user, journeys, hardware, software, meetingDuration) {
    this._user = user
    this._journeys = journeys
    this._hardware = hardware
    this._software = software
    this._meetingDuration = meetingDuration
  }

  // Getters

  /**
   * Getter of the user who creates the meeting.
   */
  get user () {
    return this._user
  }

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
   * Getter The software used for the meeting.
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
   * Setter of the user who creates the meeting.
   */
  set user (user) {
    this._user = user
  }

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
   * Setter The software used for the meeting.
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

module.exports = Meeting
