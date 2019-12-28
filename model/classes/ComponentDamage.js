'use strict'

class ComponentDamage {
  /**
   * Create an object that represents the dammage of any component of the meeting.
   * @param {Number} humanHealth - The damage value on Human Health.
   * @param {Number} ecosystemQuality - The damage value on Ecosystem Quality.
   * @param {Number} climateChange - The damage value on Climate Change.
   * @param {Number} resources - The damage value on Resources.
   */
  constructor (humanHealth, ecosystemQuality, climateChange, resources) {
    this.humanHealth = humanHealth
    this.ecosystemQuality = ecosystemQuality
    this.climateChange = climateChange
    this.resources = resources
  }
}

module.exports = ComponentDamage
