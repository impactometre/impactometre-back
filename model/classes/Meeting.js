'use strict'

export default class Meeting {
  /**
   * Create a meeting.
   * @param {String} user - The user who creates the meeting.
   * @param {Map} transport - The distances travelled for the meeting aggregated by mode of transport.
   * @param {Map} hardware  - The hardware used for the meeting indexed by equipment type.
   * @param {Set} software - The software equipment used for the meeting.
   */
  constructor (user, transport, hardware, software) {
    this.user = user
    this.transport = transport
    this.hardware = hardware
    this.software = software
  }
}
