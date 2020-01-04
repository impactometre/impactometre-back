'use strict'

const {
  daysWorkedByYear,
  dayInHours,
  knownOperatingTimeOverLife,
  hardwareDamageTypes,
  minutesInHour
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
    this._embodied = json.embodied
    this._operatingOneMinVisio = json.operatingOneMinVisio
    this._operatingOneMinStandby = json.operatingOneMinStandby
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
   * Get the embodied damage info for the hardware.
   * It's a raw JSON that may contain upper and lower
   * values.
   * @return {Object} - Raw embodied damage.
   */
  get embodied () {
    return this._embodied
  }

  /**
   * Get the damage attributed to one minute usage of
   * the hardware during a visio. It's a raw JSON that
   * may contain upper and lower values.
   * @return {Object} - Raw visio operating damage.
   */
  get operatingOneMinVisio () {
    return this._operatingOneMinVisio
  }

  /**
   * Get the damage attributed to one standby minute of
   * the hardware. It's a raw JSON that may contain upper
   * and lower values.
   * @return {Object} - Raw standby operating damage.
   */
  get operatingOneMinStandby () {
    return this._operatingOneMinStandby
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
   * @return {Number} The operating time per day (in hours)
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
   * Get the damage values for the given damage type. A damage can
   * be for visio or standby time, and for embodied or operating
   * lifecycle phase.
   * @param {String} damageType - The type of the required damage.
   * @param {*} bound - The optional bound.
   * @return {Object} JSON containing the four damage values.
   * @see hardwareDamageTypes
   */
  getTypedDamage (damageType, bound = null) {
    if (
      damageType === hardwareDamageTypes.EMBODIED_VISIO ||
      damageType === hardwareDamageTypes.EMBODIED_STANDBY
    ) {
      damageType = 'embodied'
    }

    if (!this[damageType]) {
      return null
    }

    // If bound specific values are available
    if (this[damageType].upper && this[damageType].lower) {
      /* If desired bound value was given, we return
      the corresponding value. Else we return the
      upper value. */
      const boundSpecificValue = (bound != null)
        ? this[damageType][bound]
        : this[damageType].upper

      return boundSpecificValue
    }

    // Else we return the unique value available
    return this[damageType]
  }

  /**
   * Get the duration by which we have to multiply the damage
   * we computed. This duration depends on whether the damage
   * is for visio or standby time.
   * @param {String} damageType - The type of the required damage.
   * @param {Number} meetingDuration - The meeting duration (in minutes).
   * @return {Number} The required duration (in minutes).
   */
  getDuration (damageType, meetingDuration) {
    if (
      damageType === hardwareDamageTypes.EMBODIED_VISIO ||
      damageType === hardwareDamageTypes.OPERATING_VISIO
    ) {
      // If damage is for visio time we return the meeting duration
      return meetingDuration
    }

    /* If damage is for standby time we compute how many hours of
    standby we have for the meeting duration. First we compute how many hours of
    standby we have for one hour of meeting. */
    let standbyDurationForOneHourVisio = this.computeTime(damageType) / this.computeTime(hardwareDamageTypes.OPERATING_VISIO)

    // Convert to minutes
    standbyDurationForOneHourVisio *= minutesInHour

    // Get the corresponding value for the meeting duration (cross product)
    const standbyDurationForMeeting = meetingDuration * standbyDurationForOneHourVisio / minutesInHour

    return standbyDurationForMeeting
  }

  /**
   * Compute how long the hardware is used for visio
   * or on standby over its lifetime.
   * @param {String} - The damage type for which we want to compute the hardware time.
   * @return {Number} The required time (in hours).
   */
  computeTime (damageType) {
    if (
      damageType === hardwareDamageTypes.EMBODIED_VISIO ||
      damageType === hardwareDamageTypes.OPERATING_VISIO
    ) {
      // Damage is for visio time
      // We may not need to compute the value
      if (knownOperatingTimeOverLife[this.name]) {
        return knownOperatingTimeOverLife[this.name]
      }

      return this.lifetime * daysWorkedByYear * this.operatingTimePerDay
    }

    // Damage is for standby time
    // We infer the standby time per day from the operating time
    const standbyTimePerDay = dayInHours - this.operatingTimePerDay
    return this.lifetime * daysWorkedByYear * standbyTimePerDay
  }

  /**
   * Compute a damage of a given type.
   * @param {String} - The damage type.
   * @param {Number} - The meeting duration (in minutes).
   * @param {String} - The optional bound.
   * @return {ComponentDamage} The hardware operating damage.
   */
  computeTypedDamage (damageType, meetingDuration, bound = null) {
    // Variable we will return
    let damage

    // Hardware may be composed of other hardwares
    if (Object.keys(this._components).length > 0) {
      damage = new ComponentDamage()
      /* For each component, compute its operating damage
      and add it to composite hardware damage */
      Object.values(this._components).forEach(component => {
        const componentDamage = component.computeTypedDamage(damageType, meetingDuration, bound)
        Object.keys(damage).map((category) => {
          damage[category] += componentDamage[category]
        })
      })

      return damage
    }

    // Hardware may not have any value for the required damage
    if (!this.getTypedDamage(damageType, bound)) {
      damage = new ComponentDamage()

      return damage
    }

    damage = new ComponentDamage(this.getTypedDamage(damageType, bound))
    if (
      damageType === hardwareDamageTypes.OPERATING_STANDBY ||
      damageType === hardwareDamageTypes.OPERATING_VISIO
    ) {
      // Required damage is for operating lifecycle phase
      // Hardware damage may depends on its size
      if (this._isSizeDependent) {
        damage.mutate(category => {
          return damage[category] * this._shareForVisio * this._size * this.getDuration(damageType, meetingDuration)
        })
      } else {
        damage = new ComponentDamage(this.getTypedDamage(damageType, bound))
        damage.mutate(category => {
          return damage[category] * this._shareForVisio * this.getDuration(damageType, meetingDuration)
        })
      }

      return damage
    }

    // Required damage is for embodied lifecycle phase
    if (this._isSizeDependent) {
      damage.mutate(category => {
        // Embodied damage on the whole lifetime
        damage[category] *= this._shareForVisio * this._size

        // Embodied damage for an hour
        damage[category] /= this.computeTime(damageType)

        // Embodied damage for a minute
        damage[category] /= minutesInHour

        // Embodied damage for the meeting
        damage[category] *= this.getDuration(damageType, meetingDuration)

        return damage[category]
      })
    } else {
      damage.mutate(category => {
        damage[category] *= this._shareForVisio
        damage[category] /= this.computeTime(damageType)
        damage[category] /= minutesInHour
        damage[category] *= this.getDuration(damageType, meetingDuration)

        return damage[category]
      })
    }

    return damage
  }

  /**
   * Compute the total damage of the object.
   * @param {String} bound - The optional bound.
   * @return {ComponentDamage} The total damage.
   */
  computeDamage (meetingDuration, bound = null) {
    const operatingVisio = this.computeTypedDamage(hardwareDamageTypes.OPERATING_VISIO, meetingDuration, bound)
    const embodiedVisio = this.computeTypedDamage(hardwareDamageTypes.EMBODIED_VISIO, meetingDuration, bound)
    const operatingStandby = this.computeTypedDamage(hardwareDamageTypes.OPERATING_STANDBY, meetingDuration, bound)
    const embodiedStandby = this.computeTypedDamage(hardwareDamageTypes.EMBODIED_STANDBY, meetingDuration, bound)

    return operatingVisio.add(embodiedVisio).add(operatingStandby).add(embodiedStandby)
  }
}

module.exports = Hardware
