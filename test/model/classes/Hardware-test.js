'use strict'

const assert = require('assert')
const hardwareDatabase = require('../../../model/database/meeting/hardware')
const Hardware = require('../../../model/classes/Hardware')
const {
  knownHardwareOperatingTime,
  knownHardwareStandbyTime,
  hardwareLifetime,
  hardwareOperatingTimePerDay,
  hardwareBound
} = require('../../../constants/meeting')

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
    const hardwaresWithKnownOperatingTime = Object.keys(knownHardwareOperatingTime)
    it('should return the known value if exists in constants', () => {
      Object.values(hardwareDatabase).filter(json => {
        return hardwaresWithKnownOperatingTime.includes(json.name)
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
            !(hardwaresWithKnownOperatingTime.includes(json.name)) &&
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
            !(hardwaresWithKnownOperatingTime.includes(json.name)) &&
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
            !(hardwaresWithKnownOperatingTime.includes(json.name)) &&
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
  describe('#computeStandbyTime()', () => {
    const hardwaresWithKnownStandbyTime = Object.keys(knownHardwareStandbyTime)
    it('should return the known value if exists in constants', () => {
      Object.values(hardwareDatabase).filter(json => {
        return hardwaresWithKnownStandbyTime.includes(json.name)
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          knownHardwareStandbyTime[instance._name],
          instance.computeOperatingTime()
        )
      })
    })
    describe('should compute the value if not known', () => {
      it('when lifetime and operatingTimePerDay are based on DESKTOP values', () => {
        Object.values(hardwareDatabase).filter(json => {
          return (
            !(hardwaresWithKnownStandbyTime.includes(json.name)) &&
            json.lifetime === hardwareLifetime.DESKTOP &&
            json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
          )
        }).forEach(json => {
          const instance = new Hardware(json)
          assert.strictEqual(
            19550,
            instance.computeStandbyTime()
          )
        })
      })
      it('when lifetime is based on DESKTOP value and operatingTimePerDay on LOGITECH_KIT', () => {
        Object.values(hardwareDatabase).filter(json => {
          return (
            !(hardwaresWithKnownStandbyTime.includes(json.name)) &&
            json.lifetime === hardwareLifetime.DESKTOP &&
            json.operatingTimePerDay === hardwareOperatingTimePerDay.LOGITECH_KIT
          )
        }).forEach(json => {
          const instance = new Hardware(json)
          assert.strictEqual(
            26910,
            instance.computeStandbyTime()
          )
        })
      })
      it('when lifetime is based on POWER_CABLE_ONE_METER value and operatingTimePerDay on DESKTOP', () => {
        Object.values(hardwareDatabase).filter(json => {
          return (
            !(hardwaresWithKnownStandbyTime.includes(json.name)) &&
            json.lifetime === hardwareLifetime.POWER_CABLE_ONE_METER &&
            json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
          )
        }).forEach(json => {
          const instance = new Hardware(json)
          assert.strictEqual(
            78200,
            instance.computeStandbyTime()
          )
        })
      })
    })
  })
  describe('#getEmbodied()', () => {
    it('should return \'unknown\' if no available value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (!json.embodied)
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          'unknown',
          instance.getEmbodied()
        )
      })
    })
    it('should return the unique available value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.embodied != null &&
          !(json.embodied.lower) &&
          !(json.embodied.upper)
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.embodied,
          instance.getEmbodied()
        )
      })
    })
    it('should return the matching lower value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.embodied != null &&
          json.embodied.lower &&
          json.embodied.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.embodied.lower,
          instance.getEmbodied(hardwareBound.LOWER)
        )
      })
    })
    it('should return the matching upper value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.embodied != null &&
          json.embodied.lower &&
          json.embodied.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.embodied.upper,
          instance.getEmbodied(hardwareBound.UPPER)
        )
      })
    })
    it('should return the upper value by default', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.embodied != null &&
          json.embodied.lower &&
          json.embodied.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.embodied.upper,
          instance.getEmbodied()
        )
      })
    })
  })
  describe('#getOperatingOneMin()', () => {
    it('should return \'unknown\' if no available value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (!json.operatingOneMin)
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          'unknown',
          instance.getOperatingOneMin()
        )
      })
    })
    it('should return the unique available value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.operatingOneMin != null &&
          !(json.operatingOneMin.lower) &&
          !(json.operatingOneMin.upper)
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.operatingOneMin,
          instance.getOperatingOneMin()
        )
      })
    })
    it('should return the matching lower value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.operatingOneMin != null &&
          json.operatingOneMin.lower &&
          json.operatingOneMin.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.operatingOneMin.lower,
          instance.getOperatingOneMin(hardwareBound.LOWER)
        )
      })
    })
    it('should return the matching upper value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.operatingOneMin != null &&
          json.operatingOneMin.lower &&
          json.operatingOneMin.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.operatingOneMin.upper,
          instance.getOperatingOneMin(hardwareBound.UPPER)
        )
      })
    })
    it('should return the upper value by default', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.operatingOneMin != null &&
          json.operatingOneMin.lower &&
          json.operatingOneMin.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.operatingOneMin.upper,
          instance.getOperatingOneMin()
        )
      })
    })
  })
  describe('#getStandbyOneMin()', () => {
    it('should return \'unknown\' if no available value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (!json.standbyOneMin)
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          'unknown',
          instance.getStandbyOneMin()
        )
      })
    })
    it('should return the unique available value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.standbyOneMin != null &&
          !(json.standbyOneMin.lower) &&
          !(json.standbyOneMin.upper)
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.standbyOneMin,
          instance.getStandbyOneMin()
        )
      })
    })
    it('should return the matching lower value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.standbyOneMin != null &&
          json.standbyOneMin.lower &&
          json.standbyOneMin.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.standbyOneMin.lower,
          instance.getStandbyOneMin(hardwareBound.LOWER)
        )
      })
    })
    it('should return the matching upper value', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.standbyOneMin != null &&
          json.standbyOneMin.lower &&
          json.standbyOneMin.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.standbyOneMin.upper,
          instance.getStandbyOneMin(hardwareBound.UPPER)
        )
      })
    })
    it('should return the upper value by default', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.standbyOneMin != null &&
          json.standbyOneMin.lower &&
          json.standbyOneMin.upper
        )
      }).forEach(json => {
        const instance = new Hardware(json)
        assert.strictEqual(
          json.standbyOneMin.upper,
          instance.getStandbyOneMin()
        )
      })
    })
  })
})
