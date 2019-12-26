'use strict'

/**
 * This class discribed a kind of hardware device
 * entered by the user, with its number of instances used for the meetings.
 */
export default class HardwareEntered {
  /**
   * The HardwareEntered class constructor.
   * @param {hardware} hardware The kind of hardware device.
   * @param {Integer} numberOfInstances Its number of instances entered by the user
   */
  constructor (hardware, numberOfInstances) {
    this.hardware = hardware
    this.numberOfInstances = numberOfInstances
  }
}

module.exports = HardwareEntered
