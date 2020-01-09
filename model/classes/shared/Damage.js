'use strict'

class Damage {
  /**
   * Create an object that represents the damage caused by a component of the meeting,
   * a group of components or the meeting itself.
   * @param {Object} component - The meeting component we computed the damage. Can be
   * an Hardware, Journay or Software object.
   * @param {Number} humanHealth - The damage value on Human Health.
   * @param {Number} ecosystemQuality - The damage value on Ecosystem Quality.
   * @param {Number} climateChange - The damage value on Climate Change.
   * @param {Number} resources - The damage value on Resources.
   */
  constructor ({ component, humanHealth = 0, ecosystemQuality = 0, climateChange = 0, resources = 0 } = {}) {
    this._component = component
    this._damageValues = {}
    this._damageValues.humanHealth = humanHealth
    this._damageValues.ecosystemQuality = ecosystemQuality
    this._damageValues.climateChange = climateChange
    this._damageValues.resources = resources
  }

  get component () {
    return this._component
  }

  get damageValues () {
    return this._damageValues
  }

  get humanHealth () {
    return this._damageValues.humanHealth
  }

  get ecosystemQuality () {
    return this._damageValues.ecosystemQuality
  }

  get climateChange () {
    return this._damageValues.climateChange
  }

  get resources () {
    return this._damageValues.resources
  }

  set humanHealth (humanHealth) {
    this._damageValues.humanHealth = humanHealth
  }

  set ecosystemQuality (ecosystemQuality) {
    this._damageValues.ecosystemQuality = ecosystemQuality
  }

  set climateChange (climateChange) {
    this._damageValues.climateChange = climateChange
  }

  set resources (resources) {
    this._damageValues.resources = resources
  }

  /**
   * Apply the given function on the four
   * damage values.
   * @param {Function} mutation - The function to apply.
   * @returns {Damage} This mutated damage.
   */
  mutate (mutation) {
    Object.keys(this.damageValues).map(category => {
      mutation(category)
    })

    return this
  }

  /**
   * Add the given damage values to the one
   * of this damage.
   * @param {Damage} - The damage we want to add.
   * @returns {Damage} This bigger damage.
   */
  add (damage) {
    Object.keys(this.damageValues).map(category => {
      this.damageValues[category] += damage.damageValues[category]
    })

    return this
  }
}

module.exports = Damage
