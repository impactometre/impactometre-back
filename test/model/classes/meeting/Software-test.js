'use strict';

const assert = require('assert');
const constants = require('../../../../constants/meeting');
const softwareDatabase = require('../../../../database/meeting/software');
const Software = require('../../../../model/classes/meeting/Software');
const Damage = require('../../../../model/classes/shared/Damage');
const networkDatabase = require('../../../../database/meeting/network');

describe('Software class', () => {
  describe('#getInboundBandwith()', () => {
    const renavisio = new Software({ name: softwareDatabase.RENAVISIO.name });
    it('should return the unique available value', () => {
      assert.strictEqual(
        renavisio.getInboundBandwith('RENAVISIO'),
        1080
      )
    });

    it('should return the unique available value even if number of participants specified', () => {
      assert.strictEqual(
        renavisio.getInboundBandwith(3),
        1080
      )
    });

    const skype = new Software({ name: softwareDatabase.SKYPE.name });
    it('should return the matching available (lower bound) value', () => {
      assert.strictEqual(
        skype.getInboundBandwith(2, constants.bounds.LOWER),
        128
      )
    });

    it('should return the matching available upper bound value when no bound specified', () => {
      assert.strictEqual(
        skype.getInboundBandwith(2),
        1050
      )
    });

    it('should return the closest greater available (upper bound) value', () => {
      assert.strictEqual(
        skype.getInboundBandwith(4, constants.bounds.UPPER),
        4000
      )
    });

    it('should return the last available value if participants number is greater than available values', () => {
      assert.strictEqual(
        skype.getInboundBandwith(8, constants.bounds.UPPER),
        8000
      )
    })
  });
  describe('#computeEmbodiedDamage (instancesNumber, networkBound)', () => {
    const renavisio = new Software({ name: softwareDatabase.RENAVISIO.name });
    const networkEnergeticIntensityUpper = networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBit.upper;
    const fileSizeMoToBits = renavisio.fileSizeMoToBits();
    const embodiedDamage = new Damage({
      component: renavisio,
      humanHealth: networkEnergeticIntensityUpper.humanHealth * fileSizeMoToBits * 5,
      ecosystemQuality: networkEnergeticIntensityUpper.ecosystemQuality * fileSizeMoToBits * 5,
      climateChange: networkEnergeticIntensityUpper.climateChange * fileSizeMoToBits * 5,
      resources: networkEnergeticIntensityUpper.resources * fileSizeMoToBits * 5
    });

    it('should return the solftware download damage for 5 people with Renaviso', () => {
      assert.deepStrictEqual(
        renavisio.computeEmbodiedDamage(5, constants.bounds.UPPER),
        embodiedDamage
      )
    })
  });
  describe('#computeOperatingDamage (instancesNumber, bandwithBound, networkBound, meetingDuration)', () => {
    const skype = new Software({ name: softwareDatabase.SKYPE.name });
    const inboundBandwith = skype.getInboundBandwith(5);
    const networkUpperkBound = networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBit.upper;
    const instancesNumber = 5;
    const kbitToBits = constants.kbitToBits;
    const meetingDuration = 120;
    const operatingDamage = new Damage({
      component: skype,
      humanHealth: networkUpperkBound.humanHealth * inboundBandwith / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration,
      ecosystemQuality: networkUpperkBound.ecosystemQuality * inboundBandwith / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration,
      climateChange: networkUpperkBound.climateChange * inboundBandwith / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration,
      resources: networkUpperkBound.resources * inboundBandwith / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration
    });
    it('should return skype operating damage for network upper bound and upper bandwith', () => {
      assert.deepStrictEqual(
        skype.computeOperatingDamage(instancesNumber, constants.bounds.UPPER, constants.bounds.UPPER, meetingDuration),
        operatingDamage
      )
    });
    const inboundBandwithMinimun = skype.getInboundBandwith(5, constants.bounds.LOWER);
    const networkLowerBound = networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBit.lower;

    const operatingDamageMinimumBandwith = new Damage({
      component: skype,
      humanHealth: networkLowerBound.humanHealth * inboundBandwithMinimun / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration,
      ecosystemQuality: networkLowerBound.ecosystemQuality * inboundBandwithMinimun / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration,
      climateChange: networkLowerBound.climateChange * inboundBandwithMinimun / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration,
      resources: networkLowerBound.resources * inboundBandwithMinimun / kbitToBits * constants.minuteToSeconds * instancesNumber * meetingDuration
    });

    it('should return skype operating damage for network lower bound and minimun bandwith', () => {
      assert.deepStrictEqual(
        skype.computeOperatingDamage(instancesNumber, constants.bounds.LOWER, constants.bounds.LOWER, meetingDuration),
        operatingDamageMinimumBandwith
      )
    })
  });
  describe('#computeDamage (instancesNumber, bandwithBound, networkBound, meetingDuration)', () => {
    const meetingDuration = 120;
    const minuteToSeconds = constants.minuteToSeconds;
    const kbitToBits = constants.kbitToBits;
    const instancesNumber = 5;
    const skype = new Software({ name: softwareDatabase.SKYPE.name });
    const inboundBandwith = skype.getInboundBandwith(instancesNumber, constants.bounds.UPPER);
    const networkBound = networkDatabase.NETWORK_ENERGETIC_INTENSITY.operatingOneBit.upper;
    const operatingDamage = new Damage({
      component: skype,
      humanHealth: networkBound.humanHealth * inboundBandwith / kbitToBits * minuteToSeconds * instancesNumber * meetingDuration,
      ecosystemQuality: networkBound.ecosystemQuality * inboundBandwith / kbitToBits * minuteToSeconds * instancesNumber * meetingDuration,
      climateChange: networkBound.climateChange * inboundBandwith / kbitToBits * minuteToSeconds * instancesNumber * meetingDuration,
      resources: networkBound.resources * inboundBandwith / kbitToBits * minuteToSeconds * instancesNumber * meetingDuration
    });
    const fileSizeMoToBits = skype.fileSizeMoToBits();
    const embodiedDamage = new Damage({
      component: skype,
      humanHealth: networkBound.humanHealth * fileSizeMoToBits * instancesNumber,
      ecosystemQuality: networkBound.ecosystemQuality * fileSizeMoToBits * instancesNumber,
      climateChange: networkBound.climateChange * fileSizeMoToBits * instancesNumber,
      resources: networkBound.resources * fileSizeMoToBits * instancesNumber
    });
    skype.computeDamage({
      instancesNumber,
      bandwithBound: constants.bounds.UPPER,
      networkBound: constants.bounds.UPPER,
      meetingDuration
    });
    const totalDamage = new Damage();
    Object.keys(totalDamage).map((categoryDamage) => {
      totalDamage[categoryDamage] = operatingDamage[categoryDamage] + embodiedDamage[categoryDamage]
    });
    skype.computeDamage({
      instancesNumber,
      bandwithBound: constants.bounds.UPPER,
      networkBound: constants.bounds.UPPER,
      meetingDuration
    });
    it('should return the total damage caused by a software during all the meeting (embodied damage + operating damage)', () => {
      assert.deepStrictEqual(
        skype.damage,
        totalDamage
      )
    })
  })
});
