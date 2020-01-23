'use strict'

const getClosest = require('../../../utils/get-closest')
const Damage = require('../shared/Damage')
const Component = require('../shared/Component')
const {
  octetToBits,
  moToOctets,
  kbitToBits,
  minuteToSeconds,
  bounds
} = require('../../../constants/meeting')
const networkDatabase = require('../../../database/meeting/network')
const softwareDatabase = require('../../../database/meeting/software')

/**
 * Software class.
 * A software is a component of a meeting scenario.
 */
class Software extends Component {
  /**
   * Create a software thanks to the software database.
   * @param {String} name - The key of a software database entry, also the software name.
   * @param {Number} instancesNumber - The number of software instances used for the meeting.
   * @param {String} bandwithBound - The bandwith bound used for the meeting.
   * @param {String} networkBound - The network estimation bound used for the meeting.
   * @param {Number} meetingDuration - The meeting duration in minutes.
   */
  constructor ({ name }) {
    // Get the corresponding JSON object from software database
    const json = softwareDatabase[name]

    super({ french: json.french, category: json.category })
    this.name = json.name
    this._fileSize = json.fileSize
    this._bandwith = json.bandwith
  }

  // Getter

  /**
   * Getter for software file size.
   */
  get fileSize () {
    return this._fileSize
  }

  /**
   * Getter for software bandwith.
   */
  get bandwith () {
    return this._bandwith
  }

  /**
   * Getter of the damage caused by the software usage during the meeting.
   */
  get damage () {
    return this._damage
  }

  /**
   * Getter of the software name.
   */
  get name () {
    return this._name
  }

  // Setters

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

  /**
   * Setter of the software name.
   */
  set name (name) {
    this._name = name
  }

  /**
   * Setter of the damage caused by the software usage during the meeting.
   */
  set damage (damage) {
    this._damage = damage
  }

  // Other methods

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
    const networkEnergeticIntensity = new Damage(Software.getNetworkEnergeticIntensity(networkBound))

    // We compute the total damage for each damage shere (in damageUnit)
    Object.keys(operatingDamage).map((categoryDamage) => {
      // (damageUnit/bit) * (Kbit/s) = 1000 * (damageUnit/s)
      operatingDamage[categoryDamage] = networkEnergeticIntensity[categoryDamage] * inboundBandwith
      // (1000 * (damageUnit/s)) / 1000 = damageUnit/s
      operatingDamage[categoryDamage] /= kbitToBits
      // (damageUnit/s) * 60 = damageUnit/minute
      operatingDamage[categoryDamage] *= minuteToSeconds
      // Damage for one minute use for all the instances
      operatingDamage[categoryDamage] *= instancesNumber
      // Damage for all the meeting
      operatingDamage[categoryDamage] *= meetingDuration
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
    const embodiedDamage = new Damage()

    // If there is no file to download or if there is no file size,
    // we return an empty damage.
    if (!this.fileSize) return embodiedDamage

    // We get the network energetic intensity (in damageUnit/bit)
    const networkEnergeticIntensity = new Damage(Software.getNetworkEnergeticIntensity(networkBound))

    // We get the file size in bits
    const fileSize = this.fileSizeMoToBits()

    // We compute the total damage for each damage shere (in damageUnit)
    Object.keys(embodiedDamage).map((categoryDamage) => {
      embodiedDamage[categoryDamage] = networkEnergeticIntensity[categoryDamage] * fileSize * instancesNumber
    })

    // Return the computed embodied damage
    return embodiedDamage
  }

  /**
   * Compute and initialize the total damage caused by the software.
   * @param {Number} instancesNumber - The number of software instances used for the meeting.
   * @param {String} bandwithBound - The bandwith bound ('upper' or 'lower').
   * @param {String} networkBound - The network bound ('upper' or 'lower').
   * @param {Number} meetingDuration - The meeting duration in minutes.
   */
  computeDamage ({ instancesNumber, bandwithBound, networkBound, meetingDuration }) {
    // Compute the embodied damage (damage caused by downloads)
    const embodiedDamage = new Damage(this.computeEmbodiedDamage(instancesNumber, networkBound))

    // Compute the operating damage (caused by all the software instances usage during all the meeting)
    const operatingDamage = new Damage(this.computeOperatingDamage(instancesNumber, bandwithBound, networkBound, meetingDuration))

    // Add embodied damage and operating damage
    const totalDamage = new Damage().add(embodiedDamage).add(operatingDamage)

    // Return the computed total damage
    this.damage = totalDamage
  }
}

module.exports = Software
