'use strict'

class MeetingDamage {
  /**
   * Create a damage synthesis of a meeting.
   * Each value is between 1 and 100 percent and is composed of a transport share,
   * a hardware share and a software share.
   * @param {DistributedDamage} humanHealth - The damage value on Human Health.
   * @param {DistributedDamage} ecosystemQuality - The damage value on Ecosystem Quality.
   * @param {DistributedDamage} climateChange - The damage value on Climate Change.
   * @param {DistributedDamage} resources - The damage value on Resources.
   */
  constructor (humanHealth, ecosystemQuality, climateChange, resources) {
    this._humanHealth = humanHealth
    this._ecosystemQuality = ecosystemQuality
    this._climateChange = climateChange
    this._resources = resources
  }

  // Getters

  /**
   * Getter of the damage value on Human Health.
   */
  get humanHealth () {
    return this._humanHealth
  }

  /**
   * Getter of the damage value on Ecosystem Quality.
   */
  get ecosystemQuality () {
    return this._ecosystemQuality
  }

  /**
   * Getter of the damage value on Climate Change.
   */
  get climateChange () {
    return this._climateChange
  }

  /**
   * Getter of the damage value on Resources.
   */
  get resources () {
    return this._resources
  }

  // Setters

  /**
   * Setter of the damage value on Human Health.
   */
  set humanHealth (humanHealth) {
    this._humanHealth = humanHealth
  }

  /**
   * Setter of the damage value on Ecosystem Quality.
   */
  set ecosystemQuality (ecosystemQuality) {
    this._ecosystemQuality = ecosystemQuality
  }

  /**
   * Setter of the damage value on Climate Change.
   */
  set climateChange (climateChange) {
    this._climateChange = climateChange
  }

  /**
   * Setter of the damage value on Resources.
   */
  set resources (resources) {
    this._resources = resources
  }

  // Other methods
}

module.exports = MeetingDamage
