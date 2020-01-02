'use strict'

const assert = require('assert')
const constants = require('../../../../constants/meeting')
const softwareDatabase = require('../../../../model/database/meeting/software')
const Software = require('../../../../model/classes/Software')
const ComponentDamage = require('../../../../model/classes/ComponentDamage')
const networkDatabase = require('../../../../model/database/meeting/network')

describe('Software classes', () => {
  describe('#getInboundBandwith()', () => {
    const renavisio = new Software(softwareDatabase.RENAVISIO)
    it('should return the unique available value', () => {
      assert.strictEqual(
        renavisio.getInboundBandwith('RENAVISIO'),
        1080
      )
    })

    it('should return the unique available value even if number of participants specified', () => {
      assert.strictEqual(
        renavisio.getInboundBandwith(3),
        1080
      )
    })

    const skype = new Software(softwareDatabase.SKYPE)
    it('should return the matching available (minimum bound) value', () => {
      assert.strictEqual(
        skype.getInboundBandwith(2, 'minimum'),
        30
      )
    })

    it('should return the matching available ideal bound value when no bound specified', () => {
      assert.strictEqual(
        skype.getInboundBandwith(2),
        1050
      )
    })

    it('should return the closest greater available (ideal bound) value', () => {
      assert.strictEqual(
        skype.getInboundBandwith(4, 'ideal'),
        4000
      )
    })

    it('should return the last available value if participants number is greater than available values', () => {
      assert.strictEqual(
        skype.getInboundBandwith(8, 'ideal'),
        8000
      )
    })
  })
  describe('#computeEmbodiedDamage (instancesNumber, networkBound)', () => {
    const renavisio = new Software(softwareDatabase.RENAVISIO)
    const networkEnergeticIntensityUpper = networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBitUpper
    const fileSizeMoToBits = renavisio.fileSizeMoToBits()
    const embodiedDamage = new ComponentDamage({
      humanHealth: networkEnergeticIntensityUpper.humanHealth * fileSizeMoToBits * 5,
      ecosystemQuality: networkEnergeticIntensityUpper.ecosystemQuality * fileSizeMoToBits * 5,
      climateChange: networkEnergeticIntensityUpper.climateChange * fileSizeMoToBits * 5,
      resources: networkEnergeticIntensityUpper.resources * fileSizeMoToBits * 5
    })
    it('should return the solftware download damage for 5 people with Renaviso', () => {
      assert.deepStrictEqual(
        renavisio.computeEmbodiedDamage(5, constants.networkEnergeticIntensityBound.UPPER),
        embodiedDamage
      )
    })
    const jitsi = new Software(softwareDatabase.JITSI)
    const emptyDamage = new ComponentDamage(0, 0, 0, 0)
    it('should return an empty damage because Jitsi has any file to download', () => {
      assert.deepStrictEqual(
        jitsi.computeEmbodiedDamage(5, networkEnergeticIntensityUpper),
        emptyDamage
      )
    })
    it('should return 0 because the number of people doesn\'t matter when there no file to download', () => {
      assert.deepStrictEqual(
        jitsi.computeEmbodiedDamage(5, networkEnergeticIntensityUpper),
        jitsi.computeEmbodiedDamage(10, networkEnergeticIntensityUpper)
      )
    })
    const networkEnergeticIntensityLower = constants.networkEnergeticIntensityBound.LOWER
    it('should return 0 because the network energetic intensity value doesn\'t matter when there no file to download', () => {
      assert.deepStrictEqual(
        jitsi.computeEmbodiedDamage(5, networkEnergeticIntensityLower),
        jitsi.computeEmbodiedDamage(10, networkEnergeticIntensityLower)
      )
    })
  })
  describe('#computeOperatingDamage (instancesNumber, bandwithBound, networkBound, meetingDuration)', () => {
    const skype = new Software(softwareDatabase.SKYPE)
    const inboundBandwith = skype.getInboundBandwith(5)
    const networkUpperkBound = networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBitUpper
    const instancesNumber = 5
    const secondsInMinutes = constants.secoundsInMinute
    const bitsInKbits = constants.bitsInKbits
    const meetingDuration = 120
    const operatingDamage = new ComponentDamage({
      humanHealth: networkUpperkBound.humanHealth * inboundBandwith / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration,
      ecosystemQuality: networkUpperkBound.ecosystemQuality * inboundBandwith / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration,
      climateChange: networkUpperkBound.climateChange * inboundBandwith / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration,
      resources: networkUpperkBound.resources * inboundBandwith / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration
    })
    it('should return skype operating damage for network upper bound and ideal bandwith', () => {
      assert.deepStrictEqual(
        skype.computeOperatingDamage(instancesNumber, constants.bandwidthBound.IDEAL, constants.networkEnergeticIntensityBound.UPPER, meetingDuration),
        operatingDamage
      )
    })
    const inboundBandwithMinimun = skype.getInboundBandwith(5, constants.bandwidthBound.MINIMUM)
    const networkLowerBound = networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBitLower
    const operatingDamageMinimumBandwith = new ComponentDamage({
      humanHealth: networkLowerBound.humanHealth * inboundBandwithMinimun / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration,
      ecosystemQuality: networkLowerBound.ecosystemQuality * inboundBandwithMinimun / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration,
      climateChange: networkLowerBound.climateChange * inboundBandwithMinimun / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration,
      resources: networkLowerBound.resources * inboundBandwithMinimun / bitsInKbits * secondsInMinutes * instancesNumber * meetingDuration
    })
    it('should return skype operating damage for network lower bound and minimun bandwith', () => {
      assert.deepStrictEqual(
        skype.computeOperatingDamage(instancesNumber, constants.bandwidthBound.MINIMUM, constants.networkEnergeticIntensityBound.LOWER, meetingDuration),
        operatingDamageMinimumBandwith
      )
    })
  })
})
