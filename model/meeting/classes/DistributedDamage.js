'use strict'

export default class DistributedDamage {
  /**
   * Create a damage synthesis for a given damage category
   * shared among the three meeting impact categories.
   * @param {Number} total - The total damage value (transport share + hardware share + software share).
   * @param {Number} transportShare - The transport damage share.
   * @param {Number} hardwareShare - The hardware damage share.
   * @param {Number} softwareShare - The software damage share.
   */
  constructor (total, transportShare, hardwareShare, softwareShare) {
    this._total = total
    this._transportShare = transportShare
    this._hardwareShare = hardwareShare
    this._softwareShare = softwareShare
  }

  // Getters

  /**
   * Getter of the total damage value (transport share + hardware share + software share).
   */
  get total () {
    return this._total
  }

  /**
   * Getter of the transport damage share.
   */
  get transportShare () {
    return this._transportShare
  }

  /**
   * Getter of the hardware damage share.
   */
  get hardwareShare () {
    return this._hardwareShare
  }

  /**
   * Getter of the software damage share.
   */
  get softwareShare () {
    return this._softwareShare
  }

  // Setters

  /**
   * Setter of the total damage value (transport share + hardware share + software share).
   */
  set total (total) {
    this._total = total
  }

  /**
   * Setter of the transport damage share.
   */
  set transportShare (transportShare) {
    this._transportShare = transportShare
  }

  /**
   * Setter of the hardware damage share.
   */
  set hardwareShare (hardwareShare) {
    this._hardwareShare = hardwareShare
  }

  /**
   * Setter of the software damage share.
   */
  set softwareShare (softwareShare) {
    this._softwareShare = softwareShare
  }

  // Other methods
}
