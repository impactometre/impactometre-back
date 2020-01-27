'use strict'

const {
  daysWorkedByYear,
  dayToHours,
  knownOperatingTimeOverLife,
  hardwareDamageTypes,
  hourToMinutes,
  bounds
} = require('../../../constants/meeting')

const hardwareDatabase = require('../../../database/meeting/hardware')
const Damage = require('../shared/Damage')
const Component = require('../shared/Component')

class Hardware extends Component {
  /**
   * Create a hardware.
   * @param {String} name - The key of an entry from the hardware database.
   * @param {Quantity} - The instances number of the same hardware in the meeting.
   * E.g. a Logitech Kit has 4 identical cables.
   * @param {Number} size - The optional size attached to the hardware.
   * E.g. if the hardware is a TV, the size would be the area of the screen in square meter.
   * @param {Float} shareForVisio - The share of the hardware dedicated to visio.
   * E.g. if the hardware is a laptop, the user may be multi-tasking during the visio,
   * with other software application running. Value is between O and 1.
   * @param {Array} componentsPayload - Optional components constructor parameters indexed by component name.
   */
  constructor ({ name, quantity = 1, size = 1, shareForVisio = 1, componentsPayload = {} }) {
    // Get the corresponding JSON object
    const json = hardwareDatabase[name]

    super({ french: json.french, category: json.category })

    this._name = json.name
    this._quantity = quantity
    this._size = size
    this._weight = json.weight
    this._shareForVisio = shareForVisio
    this._isSizeDependent = json.isSizeDependent
    this._embodiedAssimilatedTo = json.embodiedAssimilatedTo

    this._embodied = (json.embodiedAssimilatedTo)
      ? Object.assign({}, hardwareDatabase[json.embodiedAssimilatedTo].embodied)
      : json.embodied

    this._operatingOneMinVisio = json.operatingOneMinVisio
    this._operatingOneMinStandby = json.operatingOneMinStandby
    this._lifetime = json.lifetime
    this._operatingTimePerDay = json.operatingTimePerDay
    this._components = {}

    // Populate components if necessary
    /* Check if components array is not undefined or null,
    and is actually an array */
    if (
      json.components &&
      Object.keys(json.components).length !== 0
    ) {
      for (const [name, quantity] of Object.entries(json.components)) {
        /* If the payload contains an entry for the component found
        in database, we construct the component from the payload. Else
        we construct it from the database. The payload will contain an
        entry if additional parameter is required (e.g. the size of a
        TV_SCREEN) */
        this._components[name] = (!componentsPayload[name])
          ? new Hardware({ name, quantity })
          : new Hardware(componentsPayload[name])
      }
    }
  }

  // Getters

  get name () {
    return this._name
  }

  get french () {
    return this._french
  }

  /**
   * Get the instances number of the same hardware in
   * the meeting.
   *  E.g. a Logitech Kit has 4 identical cables.
   * @returns {Number} The instances number of the same hardware.
   */
  get quantity () {
    return this._quantity
  }

  /**
   * Get the optional size attached to the hardware.
   * E.g. if the hardware is a TV, the size would be
   * the area of the screen in square meter.
   * @returns {Number} The optional size.
   */
  get size () {
    return this._size
  }

  /**
   * Get the optional weight. Useful if the embodied
   * damage is assilimated to the damage of 1g of another
   * hardware.
   * @returns {Number} The optional weight.
   */
  get weight () {
    return this._weight
  }

  /**
   * Get the hardware share dedicated to visio.
   * E.g. if the hardware is a laptop, the user
   * may be multi-tasking during the visio,
   * with other software application running.
   * @returns {Float} The share for visio (between O and 1).
   */
  get shareForVisio () {
    return this._shareForVisio
  }

  /**
   * Get the size dependance property of the hardware.
   * E.g. tv screen damage computing depends on the
   * screen size.
   * @returns {Boolean} The size dependance boolean.
   */
  get isSizeDependent () {
    return this._isSizeDependent
  }

  /**
   * Get the optional hardware name to which the current
   * hardware's embodied damage is assimilated to.
   * @see hardware.js in database
   */
  get embodiedAssimilatedTo () {
    return this._embodiedAssimilatedTo
  }

  /**
   * Get the embodied damage info for the hardware.
   * It's a raw JSON that may contain upper and lower
   * values.
   * @returns {Object} - Raw embodied damage.
   */
  get embodied () {
    return this._embodied
  }

  /**
   * Get the damage attributed to one minute usage of
   * the hardware during a visio. It's a raw JSON that
   * may contain upper and lower values.
   * @returns {Object} - Raw visio operating damage.
   */
  get operatingOneMinVisio () {
    return this._operatingOneMinVisio
  }

  /**
   * Get the damage attributed to one standby minute of
   * the hardware. It's a raw JSON that may contain upper
   * and lower values.
   * @returns {Object} - Raw standby operating damage.
   */
  get operatingOneMinStandby () {
    return this._operatingOneMinStandby
  }

  /**
   * Get the number of years during which the
   * device is used.
   * @returns {Number} The lifetime.
   */
  get lifetime () {
    return this._lifetime
  }

  /**
   * Get the number of hours the device is used
   * per worked day.
   * @returns {Number} The operating time per day (in hours)
   */
  get operatingTimePerDay () {
    return this._operatingTimePerDay
  }

  /**
   * Get the hardware components.
   * E.g. a TV is composed of TV_SCREEN_BASE and
   * TV_SCREEN components.
   * @returns {Object} Components indexed by name.
   */
  get components () {
    return this._components
  }

  /**
   * Getter of the total damage caused by the hardware.
   */
  get damage () {
    return this._damage
  }

  // Setters

  set damage (damage) {
    this._damage = damage
  }

  set quantity (quantity) {
    this._quantity = quantity
  }

  set size (size) {
    this._size = size
  }

  set weight (weight) {
    this._weight = weight
  }

  set shareForVisio (shareForVisio) {
    this._shareForVisio = shareForVisio
  }

  // Other methods

  /**
   * Compute and initialize the total damage of the object by adding together
   * the four types of damage of the hardware.
   * @param {String} bound - The optional bound.
   * If equals to 'UPPER', we will use the upper values
   * of the damages if available, and the contrary if
   * bound equals to 'LOWER'.
   */
  computeDamage ({ meetingDuration, bound = null }) {
    let damage

    // Hardware may be composed of other hardwares
    if (Object.keys(this.components).length > 0) {
      damage = new Damage()
      /* For each component, compute its damage
      and add it to composite hardware damage */
      Object.values(this.components).forEach(component => {
        component.computeDamage({ meetingDuration, bound })
        damage = damage.add(component.damage)
      })
    } else {
      const operatingVisio = this.computeTypedDamage(hardwareDamageTypes.OPERATING_VISIO, meetingDuration, bound)
      const embodiedVisio = this.computeTypedDamage(hardwareDamageTypes.EMBODIED_VISIO, meetingDuration, bound)
      const operatingStandby = this.computeTypedDamage(hardwareDamageTypes.OPERATING_STANDBY, meetingDuration, bound)
      const embodiedStandby = this.computeTypedDamage(hardwareDamageTypes.EMBODIED_STANDBY, meetingDuration, bound)

      damage = operatingVisio.add(embodiedVisio).add(operatingStandby).add(embodiedStandby)
    }

    damage.mutate(category => {
      damage[category] *= this.quantity
    })

    this.damage = damage
  }

  /**
   * Compute a damage of a given type for a given duration.
   * @param {String} - The damage type.
   * @param {Number} - The meeting duration (in minutes).
   * @param {String} - The optional bound.
   * @returns {Damage} The hardware operating damage.
   */
  computeTypedDamage (damageType, meetingDuration, bound = null) {
    // Variable we will return
    let damage

    // Hardware may not have any value for the required damage
    if (!this.getTypedDamage(damageType, bound)) {
      damage = new Damage({ component: this })

      return damage
    }

    damage = new Damage({ component: this, ...this.getTypedDamage(damageType, bound) })
    if (
      damageType === hardwareDamageTypes.OPERATING_STANDBY ||
      damageType === hardwareDamageTypes.OPERATING_VISIO
    ) {
      // Required damage is for operating lifecycle phase
      // Hardware damage may depends on its size
      if (this.isSizeDependent) {
        damage.mutate(category => {
          damage[category] *= this.shareForVisio * this.size * this.getVisioOrStandbyDuration(damageType, meetingDuration)
        })
      } else {
        damage.mutate(category => {
          damage[category] *= this.shareForVisio * this.getVisioOrStandbyDuration(damageType, meetingDuration)
        })
      }

      return damage
    }

    // Required damage is for embodied lifecycle phase
    if (this.isSizeDependent) {
      damage.mutate(category => {
        // Embodied damage on the whole lifetime
        damage[category] *= this.shareForVisio * this.size

        // Embodied damage for an hour
        damage[category] /= this.computeVisioOrStandbyTimeOverLife(damageType)

        // Embodied damage for a minute
        damage[category] /= hourToMinutes

        // Embodied damage for the meeting
        damage[category] *= this.getVisioOrStandbyDuration(damageType, meetingDuration)
      })
    } else {
      damage.mutate(category => {
        damage[category] *= this.shareForVisio
        damage[category] /= this.computeVisioOrStandbyTimeOverLife(damageType)
        damage[category] /= hourToMinutes
        damage[category] *= this.getVisioOrStandbyDuration(damageType, meetingDuration)
      })
    }

    return damage
  }

  /**
   * Get the damage values for the given damage type. A damage can
   * be for visio or standby time, and for embodied (returned value
   * is the hardware embodied damage over its life) or operating
   * lifecycle phase (returned value is the hardware operating damage
   * for one minute of visio or standby, depending on the required
   * damage type).
   * @param {String} damageType - The type of the required damage.
   * @param {String} bound - The optional bound. If equals to'UPPER',
   * we will get the upper values of the damage if available, and the
   * contrary if equals to 'LOWER'.
   * @returns {Object} JSON containing the four damage values.
   * @see hardwareDamageTypes
   */
  getTypedDamage (damageType, bound = null) {
    if (
      damageType === hardwareDamageTypes.EMBODIED_VISIO ||
      damageType === hardwareDamageTypes.EMBODIED_STANDBY
    ) {
      // Damage is for visio time
      damageType = hardwareDamageTypes.EMBODIED

      // Embodied damage may be assimilated to the one of another hardware
      if (this.embodiedAssimilatedTo) {
        /* Assimilated embodied is for 1 g, so we have to multiply
        it by the weight of our hardware */

        let boundSpecificWeight
        // Get weight specific value if available
        if (this.weight.upper && this.weight.lower) {
          boundSpecificWeight = (bound != null)
            ? this.weight[bound]
            : this.weight[bounds.UPPER]
        } else {
          boundSpecificWeight = this.weight
        }

        const weightEmbodied = Object.assign({}, this.embodied)
        Object.keys(weightEmbodied).forEach(category => {
          weightEmbodied[category] *= boundSpecificWeight
        })

        return weightEmbodied
      }
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
        : this[damageType][bounds.UPPER]

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
   * @returns {Number} The required duration (in minutes).
   */
  getVisioOrStandbyDuration (damageType, meetingDuration) {
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
    let standbyDurationForOneHourVisio = this.computeVisioOrStandbyTimeOverLife(damageType) / this.computeVisioOrStandbyTimeOverLife(hardwareDamageTypes.OPERATING_VISIO)

    // Convert to minutes
    standbyDurationForOneHourVisio *= hourToMinutes

    // Get the corresponding value for the meeting duration (cross product)
    const standbyDurationForMeeting = meetingDuration * standbyDurationForOneHourVisio / hourToMinutes

    return standbyDurationForMeeting
  }

  /**
   * Compute how long the hardware is used for visio
   * or is on standby over its lifetime.
   * @param {String} - The damage type for which we want to compute the hardware time.
   * @returns {Number} The required time (in hours).
   */
  computeVisioOrStandbyTimeOverLife (damageType) {
    if (
      damageType === hardwareDamageTypes.EMBODIED_VISIO ||
      damageType === hardwareDamageTypes.OPERATING_VISIO
    ) {
      // Damage is for visio time
      // We may not need to compute the value
      if (knownOperatingTimeOverLife[this.name]) {
        return knownOperatingTimeOverLife[this.name]
      }

      // How many days the hardware is used over its lifetime in years
      let time = this.lifetime * daysWorkedByYear

      // Multiply by the number of hours the hardware is used per day
      time *= this.operatingTimePerDay

      return time
    }

    // Damage is for standby time
    // We infer the standby time per day from the operating time
    const standbyTimePerDay = dayToHours - this.operatingTimePerDay
    return this.lifetime * daysWorkedByYear * standbyTimePerDay
  }
}

module.exports = Hardware
