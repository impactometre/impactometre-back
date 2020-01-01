'use strict'

const {
  daysWorkedByYear,
  dayInHours,
  knownHardwareOperatingTime,
  knownHardwareStandbyTime
} = require('../../constants/meeting')

const hardwareDatabase = require('../database/meeting/hardware')
const ComponentDamage = require('./ComponentDamage')

class Hardware {
  /**
   * Create a hardware.
   * @param {Object} name - The key of an entry from the hardware database.
   * @param {Number} size - The optional size attached to the hardware.
   * @param {Float} shareForVisio - The share of the hardware dedicated to visio.
   * @param {Array} componentsPayload - Components constructor parameters indexed by component name.
   */
  constructor ({ name, size = 1, shareForVisio = 1, componentsPayload = {} }) {
    const json = hardwareDatabase[name]
    this._name = json.name
    this._french = json.french
    this._size = size
    this._shareForVisio = shareForVisio
    this._isSizeDependent = json.isSizeDependent
    this._rawEmbodied = json.embodied
    this._rawOperatingOneMin = json.operatingOneMin
    this._rawStandbyOneMin = json.standbyOneMin
    this._lifetime = json.lifetime
    this._operatingTimePerDay = json.operatingTimePerDay
    this._components = {}

    // Populate components if necessary
    /* Check if components array is not undefined or null,
    and is actually an array */
    if (
      Array.isArray(json.components) &&
      json.components.length
    ) {
      json.components.forEach(name => {
        this._components[name] = (!componentsPayload[name])
          ? new Hardware({ name })
          : new Hardware(componentsPayload[name])
      })
    }
  }

  get name () {
    return this._name
  }

  get french () {
    return this._french
  }

  /**
   * Get the optional size attached to the hardware.
   * E.g. if the hardware is a TV, the size would be
   * the area of the screen in meter square.
   * @return {NUmber} The optional size.
   */
  get size () {
    return this._size
  }

  /**
   * Get the hardware share dedicated to visio.
   * E.g. if the hardware is a laptop, the user
   * may be multi-tasking during the visio,
   * with other software application running.
   * @return {Float} The share for visio (between O and 1).
   */
  get shareForVisio () {
    return this._shareForVisio
  }

  /**
   * Get the size dependance property of the hardware.
   * E.g. tv screen damage computing depends on the
   * screen size.
   * @return {Boolean} The size dependance boolean.
   */
  get isSizeDependent () {
    return this._isSizeDependent
  }

  /**
   * Get the embodied damage value, corresponding to the
   * optional bound ('upper' or 'lower').
   * @param {String} - The optional bound.
   * @return {ComponentDamage} The damage value for each damage category.
   */
  getEmbodied (bound = null) {
    if (!this._rawEmbodied) {
      return null
    }

    // If bound specific values are available
    if (this._rawEmbodied.upper && this._rawEmbodied.lower) {
      /* If desired bound value was given, we return
      the corresponding value. Else we return the
      upper value. */
      const boundSpecificValue = (bound != null)
        ? this._rawEmbodied[bound]
        : this._rawEmbodied.upper

      return boundSpecificValue
    }

    // Else we return the unique value available
    return this._rawEmbodied
  }

  /**
   * Get the hardware damage values when operating
   * during one minute, corresponding to the
   * optional bound ('upper' or 'lower').
   * @param {String} - The optional bound.
   * @return {ComponentDamage} The damage value for each damage category.
   */
  getOperatingOneMin (bound = null) {
    if (!this._rawOperatingOneMin) {
      return null
    }

    // If bound specific values are available
    if (this._rawOperatingOneMin.upper && this._rawOperatingOneMin.lower) {
      /* If desired bound value was given, we return
      the corresponding value. Else we return the
      upper value. */
      const boundSpecificValue = (bound != null)
        ? this._rawOperatingOneMin[bound]
        : this._rawOperatingOneMin.upper

      return boundSpecificValue
    }

    // Else we return the unique value available
    return this._rawOperatingOneMin
  }

  /**
   * Get the hardware damage values when being on
   * standby during one minute, corresponding to the
   * optional bound ('upper' or 'lower').
   * @param {String} - The optional bound.
   * @return {ComponentDamage} The damage value for each damage category.
   */
  getStandbyOneMin (bound = null) {
    if (!this._rawStandbyOneMin) {
      return null
    }

    // If bound specific values are available
    if (this._rawStandbyOneMin.upper && this._rawStandbyOneMin.lower) {
      /* If desired bound value was given, we return
      the corresponding value. Else we return the
      upper value. */
      const boundSpecificValue = (bound != null)
        ? this._rawStandbyOneMin[bound]
        : this._rawStandbyOneMin.upper

      return boundSpecificValue
    }

    // Else we return the unique value available
    return this._rawStandbyOneMin
  }

  /**
   * Get the number of years during which the
   * device is used.
   * @return {Number} The lifetime.
   */
  get lifetime () {
    return this._lifetime
  }

  /**
   * Get the number of hours the device is used
   * per worked day.
   * @return {Number} The operating time per day.
   */
  get operatingTimePerDay () {
    return this._operatingTimePerDay
  }

  /**
   * Get the hardware components.
   * E.g. a TV is composed of TV_SCREEN_BASE and
   * TV_SCREEN components.
   * @return {Object} Components indexed by name.
   */
  get components () {
    return this._components
  }

  /**
   * Compute the hardware operating time over its lifetime.
   * @return {Number} The operating time (in hours).
   */
  computeOperatingTime () {
    if (knownHardwareOperatingTime[this.name]) {
      return knownHardwareOperatingTime[this.name]
    }

    const operatingTime = this.lifetime * daysWorkedByYear * this.operatingTimePerDay
    return operatingTime
  }

  /**
   * Compute the hardware standby time over its lifetime.
   * @return {Number} The standby time (in hours).
   */
  computeStandbyTime () {
    if (knownHardwareStandbyTime[this.french]) {
      return knownHardwareStandbyTime[this.french]
    }

    const standbyTimePerDay = dayInHours - this.operatingTimePerDay
    const standbyTime = this.lifetime * daysWorkedByYear * standbyTimePerDay
    return standbyTime
  }

  /**
   * Compute the hardware operating damage.
   * @param {String} - The optional bound.
   * @return {ComponentDamage} The hardware operating damage.
   */
  computeOperatingDamage (bound = null) {
    // Handle composite hardware
    if (Object.keys(this._components).length > 0) {
      /* For each component, compute its operating damage
      and add it to composite hardware damage */
      const operatingDamage = new ComponentDamage()
      Object.values(this._components).forEach(component => {
        const componentOperatingDamage = component.computeOperatingDamage(bound)
        Object.keys(operatingDamage).map((category) => {
          operatingDamage[category] += componentOperatingDamage[category]
        })
      })

      return operatingDamage
    }

    // Handle no available value
    if (!this.getOperatingOneMin()) {
      return new ComponentDamage()
    }

    // Handle size-dependence
    const operatingDamage = (this._isSizeDependent)
      ? new ComponentDamage(this.getOperatingOneMin(bound)).mutate(categoryDamage => {
        categoryDamage *= this._shareForVisio * this._size
      })
      : new ComponentDamage(this.getOperatingOneMin(bound)).mutate(categoryDamage => {
        categoryDamage *= this._shareForVisio
      })

    return operatingDamage
  }

  computeStandbyDamage (bound = null) {
    // Handle composite hardware
    if (Object.keys(this._components).length > 0) {
      /* For each component, compute its operating damage
      and add it to composite hardware damage */
      const standByDamage = new ComponentDamage()
      Object.values(this._components).forEach(component => {
        const componentStandByDamage = component.computeStandbyDamage(bound)
        Object.keys(standByDamage).map((category) => {
          standByDamage[category] += componentStandByDamage[category]
        })
      })

      return standByDamage
    }

    // Handle no available value
    if (!this.getStandbyOneMin()) {
      return new ComponentDamage()
    }

    // Handle size-dependence
    const standByDamage = (this._isSizeDependent)
      ? new ComponentDamage(this.getStandbyOneMin(bound)).mutate(categoryDamage => {
        categoryDamage *= this._shareForVisio * this._size
      })
      : new ComponentDamage(this.getStandbyOneMin(bound)).mutate(categoryDamage => {
        categoryDamage *= this._shareForVisio
      })

    return standByDamage
  }
}

module.exports = Hardware
