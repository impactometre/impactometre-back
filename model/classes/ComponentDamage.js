'use strict'

class ComponentDamage {
  /**
   * Create an object that represents the dammage of any component of the meeting.
   * @param {Number} humanHealth - The damage value on Human Health.
   * @param {Number} ecosystemQuality - The damage value on Ecosystem Quality.
   * @param {Number} climateChange - The damage value on Climate Change.
   * @param {Number} resources - The damage value on Resources.
   */
  constructor ({ humanHealth = 0, ecosystemQuality = 0, climateChange = 0, resources = 0 } = {}) {
    this._humanHealth = humanHealth
    this._ecosystemQuality = ecosystemQuality
    this._climateChange = climateChange
    this._resources = resources
  }

  get humanHealth () {
    return this._humanHealth
  }

  get ecosystemQuality () {
    return this._ecosystemQuality
  }

  get climateChange () {
    return this._climateChange
  }

  get resources () {
    return this._resources
  }

  /**
   * Apply the given function on the four
   * damage values.
   * @param {Function} mutation - The function to apply.
   * @return {ComponentDamage} This mutated damage.
   */
  mutate (mutation) {
    Object.keys(this).map(category => {
      this[category] = mutation(category)
    })

    return this
  }

  /**
   * Add the given damage values to the one
   * of this damage.
   * @param {ComponentDamage} - The damage we want to add.
   * @return {ComponentDamage} This bigger damage.
   */
  add (damage) {
    Object.keys(this).map(category => {
      this[category] += damage[category]
    })

    return this
  }
}

module.exports = ComponentDamage
