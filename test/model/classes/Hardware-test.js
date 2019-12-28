'use strict'

const assert = require('assert')
const hardwareDatabase = require('../../../model/database/meeting/hardware')
const Hardware = require('../../../model/classes/Hardware')
const { knownHardwareOperatingTime, hardwareLifetime, hardwareOperatingTimePerDay } = require('../../../constants/meeting')

describe('Hardware class', () => {
  describe('#constructor()', () => {
    it('should create an Hardware instance for each hardware json', () => {
      Object.values(hardwareDatabase).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(instance._name, json.name)
        assert.strictEqual(instance._french, json.french)
        assert.strictEqual(instance._embodied, json.embodied)
        assert.strictEqual(instance._operatingOneMin, json.operatingOneMin)
        assert.strictEqual(instance._standbyOneMin, json.standbyOneMin)
        assert.strictEqual(instance._lifetime, json.lifetime)
        assert.strictEqual(instance._operatingTimePerDay, json.operatingTimePerDay)
      })
    })
  })
  describe('#computeOperatingTime()', () => {
    it('should return the known value if exists in constants', () => {
      Object.values(hardwareDatabase).filter(json => {
        return json.lifetime == null || json.operatingTimePerDay == null
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          knownHardwareOperatingTime[instance._name],
          instance.computeOperatingTime()
        )
      })
    })
    describe('should compute the value if not known', () => {
      it('when lifetime and operatingTimePerDay are based on DESKTOP values', () => {
        Object.values(hardwareDatabase).filter(json => {
          return (
            json.lifetime === hardwareLifetime.DESKTOP &&
            json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
          )
        }).forEach(json => {
          const instance = new Hardware(json)
          assert.strictEqual(
            8050,
            instance.computeOperatingTime()
          )
        })
      })
      it('when lifetime is based on DESKTOP value and operatingTimePerDay on LOGITECH_KIT', () => {
        Object.values(hardwareDatabase).filter(json => {
          return (
            json.lifetime === hardwareLifetime.DESKTOP &&
            json.operatingTimePerDay === hardwareOperatingTimePerDay.LOGITECH_KIT
          )
        }).forEach(json => {
          const instance = new Hardware(json)
          assert.strictEqual(
            690,
            instance.computeOperatingTime()
          )
        })
      })
      it('when lifetime is based on POWER_CABLE_ONE_METER value and operatingTimePerDay on DESKTOP', () => {
        Object.values(hardwareDatabase).filter(json => {
          return (
            json.lifetime === hardwareLifetime.POWER_CABLE_ONE_METER &&
            json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
          )
        }).forEach(json => {
          const instance = new Hardware(json)
          assert.strictEqual(
            32200,
            instance.computeOperatingTime()
          )
        })
      })
    })
  })
})
