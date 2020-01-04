'use strict'

export default class DistributedDamage {
  /**
   * Create a damage synthesis for a given damage category
   * shared among tht three meeting impact categories.
   * @param {Number} total - The total damage value.
   * @param {Number} transportShare - The transport share.
   * @param {Number} hardwareShare - The hardware share.
   * @param {Number} softwareShare - The software share.
   */
  constructor (total, transportShare, hardwareShare, softwareShare) {
    this.total = total
    this.transportShare = transportShare
    this.hardwareShare = hardwareShare
    this.softwareShare = softwareShare
  }
}
