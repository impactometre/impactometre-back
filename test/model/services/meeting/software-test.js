'use strict'

const assert = require('assert')
const constants = require('../../../../constants/meeting')
// const Software = require('../../../../model/services/meeting/software')
const softwareDatabase = require('../../../../model/database/meeting/software')
const Software = require('../../../../model/classes/Software')
const ComponentDamage = require('../../../../model/classes/ComponentDamage')
const networkDatabase = require('../../../../model/database/meeting/network')
const getClosest = require('../../../../utils/get-closest')

describe('Software services', () => {
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
  describe('#computesEmbodiedDamage (instancesNumber, networkBound)', () => {
    const renavisio = new Software(softwareDatabase.RENAVISIO)
    const networkEnergeticIntensityUpper = networkDatabase.NETWORK_ENERGETIC_INTENSITY_UPPER.operatingOneBit
    const fileSizeInBits = renavisio.fileSizeInBits()
    const embodiedDamage = new ComponentDamage(
      networkEnergeticIntensityUpper.humanHealth * fileSizeInBits * 5,
      networkEnergeticIntensityUpper.ecosystemQuality * fileSizeInBits * 5,
      networkEnergeticIntensityUpper.climateChange * fileSizeInBits * 5,
      networkEnergeticIntensityUpper.resources * fileSizeInBits * 5
    )
    it('should return the solftware download damage for 5 people with Renaviso', () => {
      assert.deepEqual(
        renavisio.computesEmbodiedDamage(5, constants.networkEnergeticIntensityBound.UPPER),
        embodiedDamage
      )
    })
    const jitsi = new Software(softwareDatabase.JITSI)
    const emptyDamage = new ComponentDamage(0, 0, 0, 0)
    it('should return an empty damage because Jitsi has any file to download', () => {
      assert.deepEqual(
        jitsi.computesEmbodiedDamage(5, networkEnergeticIntensityUpper),
        emptyDamage
      )    
    })
    it('should return 0 because the number of people doesn\'t matter when there no file to download', () => {
      assert.deepEqual(
        jitsi.computesEmbodiedDamage(5, networkEnergeticIntensityUpper),
        jitsi.computesEmbodiedDamage(10, networkEnergeticIntensityUpper)
      )
    })
    const networkEnergeticIntensityLower = constants.networkEnergeticIntensityBound.LOWER
    it('should return 0 because the network energetic intensity value doesn\'t matter when there no file to download', () => {
      assert.deepEqual(
        jitsi.computesEmbodiedDamage(5, networkEnergeticIntensityLower),
        jitsi.computesEmbodiedDamage(10, networkEnergeticIntensityLower)
      )
    })
  })
  describe('#computesOperatingDamage (instancesNumber, bandwithBound, networkBound)', () => {
    const skype = new Software(softwareDatabase.SKYPE)
    const inboundBandwith = skype.getInboundBandwith(5)
    const networkUpperkBound = networkDatabase.NETWORK_ENERGETIC_INTENSITY_UPPER.operatingOneBit
    const instancesNumber = 5
    const closestAvailableInstancesNumber = getClosest(5, Object.keys(skype.bandwith.inbound))
    // networkEnergeticIntensity.humanHealth * inboundBandwith * 60 * 1000 * instancesNumber
    const operatingDamage = new ComponentDamage(
      networkUpperkBound.humanHealth * inboundBandwith * 60 * 1000 * instancesNumber,
      networkUpperkBound.ecosystemQuality * inboundBandwith * 60 * 1000 * instancesNumber,
      networkUpperkBound.climateChange * inboundBandwith * 60 * 1000 * instancesNumber,
      networkUpperkBound.resources * inboundBandwith * 60 * 1000 * instancesNumber,
    )
    it('should return skype operating damage for network upper bound and ideal bandwith', () => {
      assert.deepEqual(
        skype.computesOperatingDamage(instancesNumber, constants.bandwidthBound.IDEAL, constants.networkEnergeticIntensityBound.UPPER),
        operatingDamage
      )
    })
    const inboundBandwithMinimun = skype.getInboundBandwith(5, constants.bandwidthBound.MINIMUM)
    const networkLowerBound = networkDatabase.NETWORK_ENERGETIC_INTENSITY_LOWER.operatingOneBit
    const operatingDamageMinimumBandwith = new ComponentDamage(
      networkLowerBound.humanHealth * inboundBandwithMinimun * 60 * 1000 * instancesNumber,
      networkLowerBound.ecosystemQuality * inboundBandwithMinimun * 60 * 1000 * instancesNumber,
      networkLowerBound.climateChange * inboundBandwithMinimun * 60 * 1000 * instancesNumber,
      networkLowerBound.resources * inboundBandwithMinimun * 60 * 1000 * instancesNumber,
    )
    it('should return skype operating damage for network lower bound and minimun bandwith', () => {
      assert.deepEqual(
        skype.computesOperatingDamage(instancesNumber, constants.bandwidthBound.MINIMUM, constants.networkEnergeticIntensityBound.LOWER),
        operatingDamageMinimumBandwith
      )
    })
  })
})
