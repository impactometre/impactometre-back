'use strict'

const getClosest = require('../../../utils/get-closest')
const Damage = require('../shared/Damage')
const {
  octetToBits,
  moToOctets,
  kbitToBits,
  minuteToSeconds,
  bounds
} = require('../../../constants/meeting')
const networkDatabase = require('../../database/meeting/network')

class Software {
  constructor (software) {
    this._french = software.french
    this._fileSize = software.fileSize
    this._bandwith = software.bandwith
  }

  // Getter

  /**
   * Getter for software french name.
   */
  get french () {
    return this._french
  }

  /**
   * Getter for software file size.
   */
  get fileSize () {
    return this._fileSize
  }

  get bandwith () {
    return this._bandwith
  }

  // Setters

  /**
   * Setter of software french name.
   * @param french - The new software french name.
   */
  set french (newFrench) {
    this._french = newFrench
  }

  /**
   * Setter for software file size.
   */
  set fileSize (fileSize) {
    this._fileSize = fileSize
  }

  /**
   * Setter for software bandwith.
   */
  set bandwith (bandwith) {
    this._bandwith = bandwith
  }

  // Others methods

  /**
   * Get the software file size in bits (it is originaly in Mo)
   */
  fileSizeMoToBits () {
    return this.fileSize * octetToBits * moToOctets
  }

  /**
 * Return the given software download speed.
 * @param {String} softwareName - The software name.
 * @param {Number} participantsNumber - The participants number.
 * @param {String} bound - The bound ('lower' or 'upper').
 */
  getInboundBandwith (participantsNumber, bound) {
    const rawInbound = this.bandwith.inbound

    /* If we don't have data specific to a number of
    participants, we return the unique value we got */
    if (typeof rawInbound === 'number') {
      return rawInbound
    }

    /* Among the available download speed values, we get the
    one which participants number is the closest from the
    given participants number.
    */
    const availableNumbers = Object.keys(rawInbound)
    const closestAvailableNumber = getClosest(
      participantsNumber,
      availableNumbers
    )

    const closestValue = this.bandwith.inbound[closestAvailableNumber]

    /* If we don't have bound specific data,
    we return the unique value we got */
    if (typeof closestValue === 'number') {
      return closestValue
    }

    /* If desired bound value was given, we return
    the corresponding value. Else we return the
    upper value.
    */
    const boundSpecificValue = (bound != null)
      ? closestValue[bound]
      : closestValue[bounds.UPPER]

    return boundSpecificValue
  }

  /**
   * Returns the damage values (in damageUnit/bit) corresponding to network energetic intensity upper or lower bound.
   * It returns the upper bound value by default.
   * @param {string} networkBound - The network bound ('upper' or 'lower').
   * @returns the damage values (in damageUnit/bit) corresponding to network energetic intensity upper or lower bound.
   */
  static getNetworkEnergeticIntensity (networkBound = null) {
    const networkEnergeticIntensity = (networkBound != null)
      ? networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBit[networkBound]
      : networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBit[bounds.UPPER]

    return networkEnergeticIntensity
  }

  /**
   * Computes the software usage damage.
   * @param {Integer} instancesNumber - The number of software instances used for the meeting.
   * @param {String} bandwithBound - The bandwith bound ('upper' or 'lower').
   * @param {String} networkBound - The network bound ('upper' or 'lower').
   * @param {Number} meetingDuration - The meeting duration in minutes.
   * @returns {Damage} The dammage caused by one minute's use of the software.
   */
  computeOperatingDamage (instancesNumber, bandwithBound, networkBound, meetingDuration) {
    // Initialize the new operating damage
    const operatingDamage = new Damage({ component: this })

    // If the software has no inboud bandwith in the database, we return an empty damage
    if (!this.bandwith) return operatingDamage

    // We get the inboundBandwith (in Kbit/s)
    const inboundBandwith = this.getInboundBandwith(instancesNumber, bandwithBound)

    // We get the network energetic intensity (in damageUnit/bit)
    const networkEnergeticIntensity = new Damage({
      component: this,
      ...Software.getNetworkEnergeticIntensity(networkBound)
    })

    // We compute the total damage for each damage shere (in damageUnit)
    Object.keys(operatingDamage.damageValues).map((categoryDamage) => {
      // (damageUnit/bit) * (Kbit/s) = 1000 * (damageUnit/s)
      operatingDamage.damageValues[categoryDamage] = networkEnergeticIntensity.damageValues[categoryDamage] * inboundBandwith
      // (1000 * (damageUnit/s)) / 1000 = damageUnit/s
      operatingDamage.damageValues[categoryDamage] /= kbitToBits
      // (damageUnit/s) * 60 = damageUnit/minute
      operatingDamage.damageValues[categoryDamage] *= minuteToSeconds
      // Damage for one minute use for all the instances
      operatingDamage.damageValues[categoryDamage] *= instancesNumber
      // Damage for all the meeting
      operatingDamage.damageValues[categoryDamage] *= meetingDuration
    })

    // Return the computed operating damage
    return operatingDamage
  }

  /**
   * Compute the download software damage.
   * @param {Integer} instancesNumber - The number of software instances used for the meeting.
   * @param {string} networkBound - The network bound ('upper' or 'lower').
   * @returns {Damage} The damage caused by all the software dowloads of the meeting.
   */
  computeEmbodiedDamage (instancesNumber, networkBound) {
    // Initialize the embodied damage
    const embodiedDamage = new Damage({ component: this })

    // If there is no file to download or if there is no file size,
    // we return an empty damage.
    if (!this.fileSize) return embodiedDamage

    // We get the network energetic intensity (in damageUnit/bit)
    const networkEnergeticIntensity = new Damage({
      component: this,
      ...Software.getNetworkEnergeticIntensity(networkBound)
    })

    // We get the file size in bits
    const fileSize = this.fileSizeMoToBits()

    // We compute the total damage for each damage shere (in damageUnit)
    Object.keys(embodiedDamage.damageValues).map((categoryDamage) => {
      embodiedDamage.damageValues[categoryDamage] = networkEnergeticIntensity.damageValues[categoryDamage] * fileSize * instancesNumber
    })

    // Return the computed embodied damage
    return embodiedDamage
  }

  /**
   * Compute the total damage caused by the software.
   * @param {Number} instancesNumber - The number of software instances used for the meeting.
   * @param {String} bandwithBound - The bandwith bound ('upper' or 'lower').
   * @param {String} networkBound - The network bound ('upper' or 'lower').
   * @param {Number} meetingDuration - The meeting duration in minutes.
   * @returns {Damage} The total dammage caused the software.
   */
  computeDamage (instancesNumber, bandwithBound, networkBound, meetingDuration) {
    // Compute the embodied damage (damage caused by downloads)
    const embodiedDamage = new Damage({
      component: this,
      ...this.computeEmbodiedDamage(instancesNumber, networkBound).damageValues
    })

    // Compute the operating damage (caused by all the software instances usage during all the meeting)
    const operatingDamage = new Damage({
      component: this,
      ...this.computeOperatingDamage(instancesNumber, bandwithBound, networkBound, meetingDuration).damageValues
    })

    // Add embodied damage and operating damage
    const totalDamage = new Damage({ component: this }).add(embodiedDamage).add(operatingDamage)

    // Return the computed total damage
    return totalDamage
  }
}

module.exports = Software
