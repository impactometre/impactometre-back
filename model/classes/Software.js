'use strict'

const getClosest = require('../../utils/get-closest')
const ComponentDamage = require('ComponentDamage.js')
const meetingEnums = require('../enums/meeting/enums')
const hardwareDatabase = require('../database/meeting/hardware')

class Software {
  constructor (software) {
    this.french = software.french
    this.fileSize = software.fileSize
    this.bandwith = software.bandwith
  }

  // Getter

  /**
   * Getter for software french name.
   */
  get french () {
    return this.french
  }

  /**
   * Getter for software file size.
   */
  get fileSize () {
    return this.fileSize
  }

  /**
   * Get the software file size in bits (it' originaly in Mo)
   */
  fileSizeInBits () {
    return this.fileSize() * 8 * 1000000
  }

  /**
 * Return the given software download speed.
 * @param {String} softwareName - The software name.
 * @param {Number} participantsNumber - The participants number.
 * @param {String} bound - The bound ('minimum' or 'ideal').
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
    ideal value.
    */
    const boundSpecificValue = (bound != null)
      ? closestValue[bound]
      : closestValue.ideal

    return boundSpecificValue
  }

  /**
   * Returns the damage values (in damageUnit/bit) corresponding to network energetic intensity upper or lower bound.
   * It returns the upper bound value by default.
   * @param {string} networkBound - The network bound ('upper' or 'lower').
   * @returns the damage values (in damageUnit/bit) corresponding to network energetic intensity upper or lower bound.
   */
  static getNetworkEnergeticIntensity (networkBound) {
    let networkEnergeticIntensity

    if (networkBound === meetingEnums.networkEnergeticIntensityBound.LOWER) {
      networkEnergeticIntensity = hardwareDatabase.NETWORK_ENERGETIC_INTENSITY_LOWER.operatingOneBit
    } else {
      networkEnergeticIntensity = hardwareDatabase.NETWORK_ENERGETIC_INTENSITY_UPPER.operatingOneBit
    }

    return networkEnergeticIntensity
  }

  /**
   * Computes the software usage damage.
   * @param {Integer} instancesNumber - The number of software instances used for the meeting.
   * @param {String} bandwidthBound - The bandwidth bound ('minimum' or 'ideal').
   * @param {String} networkBound - The network bound ('upper' or 'lower').
   * @returns {ComponentDamage} The dammage cauded by one minute's use of the software.
   */
  computesOperatingDamage (instancesNumber, bandwidthBound, networkBound) {
    // If the software has no inboud bandwidth in the database, we return an empty damage
    if (!this.bandwith) return new ComponentDamage(0, 0, 0, 0)

    // We get the inboundBandwidth (in Kbit/s)
    const inboundBandwidth = this.getInboundBandwith(instancesNumber, bandwidthBound)
    // We get the network energetic intensity (in damageUnit/bit)
    const networkEnergeticIntensity = Software.getNetworkEnergeticIntensity(networkBound)

    // We compute the total damage for each damage sphere (damageUnit/minute)
    const humanHealthDamage = networkEnergeticIntensity.humanHealth * inboundBandwidth * 60 * 1000 * instancesNumber
    const ecosystemQualityDamage = networkEnergeticIntensity.ecosystemQuality * inboundBandwidth * 60 * 1000 * instancesNumber
    const climateChangeDamage = networkEnergeticIntensity.climateChange * inboundBandwidth * 60 * 1000 * instancesNumber
    const resourcesDamage = networkEnergeticIntensity.resources * inboundBandwidth * 60 * 1000 * instancesNumber

    const operatingDamage = new ComponentDamage(humanHealthDamage, ecosystemQualityDamage, climateChangeDamage, resourcesDamage)

    return operatingDamage
  }

  /**
   * Compute the download software damage.
   * @param {Integer} instancesNumber - The number of software instances used for the meeting.
   * @param {string} networkBound - The network bound ('upper' or 'lower').
   */
  computesEmbodiedDamage (instancesNumber, networkBound) {
    // If there no file to download or if there is no file size,
    // we return an empty damage.
    if (!this.fileSize) return new ComponentDamage(0, 0, 0, 0)

    // We get the network energetic intensity (in damageUnit/bit)
    const networkEnergeticIntensity = Software.getNetworkEnergeticIntensity(networkBound)

    // We get the file size in bits
    const fileSize = this.fileSizeInBits()

    // We compute the total damage for each damage shere (in damageUnit)
    const humanHealthDamage = networkEnergeticIntensity.humanHealth * fileSize * instancesNumber
    const ecosystemQualityDamage = networkEnergeticIntensity.ecosystemQuality * fileSize * instancesNumber
    const climateChangeDamage = networkEnergeticIntensity.climateChange * fileSize * instancesNumber
    const resourcesDamage = networkEnergeticIntensity.resources * fileSize * instancesNumber

    const embodiedDamage = new ComponentDamage(humanHealthDamage,
      ecosystemQualityDamage, climateChangeDamage, resourcesDamage)

    return embodiedDamage
  }
}

module.exports = Software
