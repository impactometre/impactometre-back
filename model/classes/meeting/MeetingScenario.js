'use strict'

const Scenario = require('../shared/Scenario')
const MeetingDamage = require('./MeetingDamage')
const {
  meetingCategoryDamage
} = require('../../../constants/meeting')

class MeetingScenario extends Scenario {
  /**
   * Create a scenario corresponding to a meeting.
   * @param {String} user - The user who creates the scenario.
   * @param {Number} meetingDuration - The scenario duration in minutes.
   * @param {Object} payload - A JSON object that contains three arrays that enable to create the three
   * category damages (hardware, software, transport) linked to the meeting. The payload is like:
   * { [array_of_all_hardware_data], [array_of_all_software_data], [array_of_all_journey data]}.
   * @see MeetingDamage
   * @see CategoryDamage
   */
  constructor ({ user, meetingDuration, payload }) {
    super(user)
    this._meetingDuration = meetingDuration
    this._damage = new MeetingDamage({
      hardwareComponents: payload[meetingCategoryDamage.HARDWARE],
      softwareComponents: payload[meetingCategoryDamage.SOFTWARE],
      journeyComponents: payload[meetingCategoryDamage.JOURNEY]
    })
  }

  // Getters

  /**
   * Getter of the user who creates the meeting scenario.
   */
  get user () {
    return this._user
  }

  /**
   * Getter of the meeting duration in minutes.
   */
  get meetingDuration () {
    return this._meetingDuration
  }

  /**
   * Getter of the MeetingDamage object linked to the meeting scenario.
   * @see MeetingDamage
   */
  get damage () {
    return this._damage
  }

  // Setters

  /**
   * Setter of the user who creates the meeting scenario.
   */
  set user (user) {
    this._user = user
  }

  /**
   * Setter of the meeting duration in minutes.
   */
  set meetingDuration (meetingDuration) {
    this._meetingDuration = meetingDuration
  }

  /**
   * Setter of the MeetingDamage object linked to the meeting scenario.
   * @see MeetingDamage
   */
  set damage (damage) {
    this._damage = damage
  }

  // Other methods

  /**
   * Compute the damage caused by all the meeting components (hardware , software and journeys)
   * Call computeDamage() methods of the MeetingDamage object linked to the MeetingScenario object.
   * @param damagePayload - A JSON object send by front end that contains all necessary data to compute
   * the damage caused by the meeting.
   * @see MeetingDamage
   */
  computeDamage (damagePayload) {
    this.damage.computeDamage(damagePayload)
  }
}

module.exports = MeetingScenario
