'use strict'

const meetingScenarios = require('../../database/meeting/meetingScenarios')
const MeetingScenario = require('../../model/classes/meeting/MeetingScenario')

/**
 * Create a scenario corresponding to a meeting and add it to the database.
 * @param {String} user - The user who creates the scenario.
 * @param {Number} meetingDuration - The scenario duration in minutes.
 * @param {Object} payload - A JSON object that contains three arrays that enable to create the three
 * category damages (hardware, software, transport) linked to the meeting. The payload is like:
 * { [array_of_all_hardware_data], [array_of_all_software_data], [array_of_all_journey data]}.
 */
function create ({ user, meetingDuration, payload }) {
  // Create new MeetingScenario
  const meetingScenario = new MeetingScenario({ user, meetingDuration, payload })

  // Add it to the database
  meetingScenarios.set(meetingScenario.id, meetingScenario)
}

/**
 * Read a non-writable meeting scenario.
 * @param {String} id - The id of the meeting scenario we want to return.
 * @returns {MeetingScenario} The meeting scenario we want to return.
 */
function read (id) {
  const meetingScenario = meetingScenarios.get(id)
  return meetingScenario
}

/**
 * Update a meeting scenario.
 * @param {String} id - The id of the meeting scenario we want to update.
 * @param {Object} payload - A JSON object that contains all necessary data to update a meeting scenario.
 */
function update (id, payload) {
  meetingScenarios.get(id).update(payload)
}

/**
 * Delete a meeting scenario from the database.
 * @param {String} id - The id of the meeting scenario we want to delete.
 * @returns {Boolean} True if deletion succeeds, false if not.
 */
function remove (id) {
  return meetingScenarios.delete(id)
}

exports.create = create
exports.read = read
exports.update = update
exports.remove = remove
