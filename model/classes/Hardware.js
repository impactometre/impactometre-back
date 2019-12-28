'use strict'

class Hardware {
  /**
   * Create a hardware.
   * @param {Object} hardwareObject - The hardware JSON object coming from database.
   */
  constructor (hardwareObject) {
    this.french = hardwareObject.french
    this.damageComputingMethod = hardwareObject.damageComputingMethod
    this.operatingOneMin = hardwareObject.operatingOneMin
    this.standbyOneMin = hardwareObject.standbyOneMin
    this.operatingTime = hardwareObject.operatingTime
    this.standbyTime = hardwareObject.standbyTime
  }

  get french () {
    return this.french
  }

  /**
   * Get the damage computing method value, which
   * is 'size dependent' or 'size independent'.
   * E.g. tv screen damage computing depends on the
   * screen size.
   * @return {String} The damage computing method.
   */
  get damageComputingMethod () {
    return this.damageComputingMethod
  }

  /**
   * Get the hardware damage values when operating
   * during one minute.
   * @return {ComponentDamage} The damage value for each damage category.
   */
  get operatingOneMin () {
    return this.operatingOneMin
  }

  /**
   * Get the hardware damage values when being on
   * standby during one minute.
   * @return {ComponentDamage} The damage value for each damage category.
   */
  get standbyOneMin () {
    return this.standbyOneMin
  }

  /**
   * Get the hardware operating time over its lifetime.
   * Computed considering 230 days worked by year.
   * Source : https://www.dougs.fr/blog/quel-est-le-nombre-de-jours-travailles-en-2020/
   * @return {Number} The operating time (in hours).
   */
  get operatingTime () {
    return this.operatingTime
  }

  /**
   * Get the hardware standby time over its lifetime.
   * Computed considering 230 days worked by year.
   * Source : https://www.dougs.fr/blog/quel-est-le-nombre-de-jours-travailles-en-2020/
   * @return {Number} The standby time (in hours).
   */
  get standbyTime () {
    return this.standbyTime
  }
}

module.exports = Hardware
