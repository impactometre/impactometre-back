'use strict'

class MeetingDamage {
  /**
   * Create a damage synthesis of a meeting.
   * Each value is between 1 and 100 and is composed of a transport share,
   * a hardware share and a software share.
   * @param {DistributedDamage} humanHealth - The damage value on Human Health
   * @param {DistributedDamage} ecosystemQuality - The damage value on Ecosystem Quality.
   * @param {DistributedDamage} climateChange - The damage value on Climate Change.
   * @param {DistributedDamage} resources - The damage value on Resources.
   */
  constructor (humanHealth, ecosystemQuality, climateChange, resources) {
    this.humanHealth = humanHealth
    this.ecosystemQuality = ecosystemQuality
    this.climateChange = climateChange
    this.resources = resources
  }
}

module.exports = MeetingDamage
