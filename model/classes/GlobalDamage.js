'use strict'

export default class GlobalDamage {
  /**
   * Create a global damage synthesis.
   * Each value is between 1 and 100.
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
