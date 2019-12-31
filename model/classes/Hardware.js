'use strict'

const {
  daysWorkedByYear,
  hoursByDay,
  knownHardwareOperatingTime,
  knownHardwareStandbyTime
} = require('../../constants/meeting')

class Hardware {
  /**
   * Create a hardware.
   * @param {Object} hardwareObject - The hardware JSON object coming from database.
   * @param {Number} size - The optional size attached to the hardware.
   * @param {Float} shareForVisio - The share of the hardware dedicated to visio.
   */
  constructor (hardwareObject, size = 1, shareForVisio = 1) {
    this._name = hardwareObject.name
    this._french = hardwareObject.french
    this._size = size
    this._shareForVisio = shareForVisio
    this._isSizeDependent = hardwareObject.isSizeDependent
    this._embodied = hardwareObject.embodied
    this._operatingOneMin = hardwareObject.operatingOneMin
    this._standbyOneMin = hardwareObject.standbyOneMin
    this._lifetime = hardwareObject.lifetime
    this._operatingTimePerDay = hardwareObject.operatingTimePerDay
    this._components = hardwareObject._components
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
    if (!this._embodied) {
      return 'unknown'
    }

    // If bound specific values are available
    if (this._embodied.upper && this._embodied.lower) {
      /* If desired bound value was given, we return
      the corresponding value. Else we return the
      upper value. */
      const boundSpecificValue = (bound != null)
        ? this._embodied[bound]
        : this._embodied.upper

      return boundSpecificValue
    }

    // Else we return the unique value available
    return this._embodied
  }

  /**
   * Get the hardware damage values when operating
   * during one minute, corresponding to the
   * optional bound ('upper' or 'lower').
   * @param {String} - The optional bound.
   * @return {ComponentDamage} The damage value for each damage category.
   */
  getOperatingOneMin (bound = null) {
    if (!this._operatingOneMin) {
      return 'unknown'
    }

    // If bound specific values are available
    if (this._operatingOneMin.upper && this._operatingOneMin.lower) {
      /* If desired bound value was given, we return
      the corresponding value. Else we return the
      upper value. */
      const boundSpecificValue = (bound != null)
        ? this._operatingOneMin[bound]
        : this._operatingOneMin.upper

      return boundSpecificValue
    }

    // Else we return the unique value available
    return this._operatingOneMin
  }

  /**
   * Get the hardware damage values when being on
   * standby during one minute, corresponding to the
   * optional bound ('upper' or 'lower').
   * @param {String} - The optional bound.
   * @return {ComponentDamage} The damage value for each damage category.
   */
  getStandbyOneMin (bound = null) {
    if (!this._standbyOneMin) {
      return 'unknown'
    }

    // If bound specific values are available
    if (this._standbyOneMin.upper && this._standbyOneMin.lower) {
      /* If desired bound value was given, we return
      the corresponding value. Else we return the
      upper value. */
      const boundSpecificValue = (bound != null)
        ? this._standbyOneMin[bound]
        : this._standbyOneMin.upper

      return boundSpecificValue
    }

    // Else we return the unique value available
    return this._standbyOneMin
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
   * @return {Array} Components names.
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

    const standbyTimePerDay = hoursByDay - this.operatingTimePerDay
    const standbyTime = this.lifetime * daysWorkedByYear * standbyTimePerDay
    return standbyTime
  }
}

module.exports = Hardware
