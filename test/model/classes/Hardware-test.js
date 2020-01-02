'use strict'

const assert = require('assert')
const hardwareDatabase = require('../../../model/database/meeting/hardware')
const Hardware = require('../../../model/classes/Hardware')
const ComponentDamage = require('../../../model/classes/ComponentDamage')
const {
  knownHardwareOperatingTime,
  knownHardwareStandbyTime,
  hardwareLifetime,
  hardwareOperatingTimePerDay,
  hardwareBound,
  hardwareDamageTypes
} = require('../../../constants/meeting')

describe('Hardware class', () => {
  describe('#constructor()', () => {
    it('should create an Hardware instance for each non-composite hardware', () => {
      Object.values(hardwareDatabase).filter(json => {
        return !(
          Array.isArray(json.components) &&
          json.components.length
        )
      }).forEach(json => {
        const instance = new Hardware({ name: json.name })
        assert.deepStrictEqual({}, instance._components)
      })
    })
    it('should create an Hardware instance for each composite hardware', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          Array.isArray(json.components) &&
          json.components.length
        )
      }).forEach(json => {
        const instance = new Hardware({ name: json.name })

        // Compute expected components
        const expected = {}
        json.components.forEach(name => {
          expected[name] = new Hardware({ name })
        })

        assert.deepStrictEqual(expected, instance._components)
      })
    })
    it('should create a composite hardware instance using components payload', () => {
      const componentsPayload = {}
      componentsPayload[hardwareDatabase.TV_SCREEN.name] = {
        name: hardwareDatabase.TV_SCREEN.name,
        size: 2
      }

      const instance = new Hardware({
        name: hardwareDatabase.TV.name,
        componentsPayload
      })

      // Compute expected components
      const expected = {}
      expected[hardwareDatabase.TV_SCREEN_BASE.name] = new Hardware({
        name: hardwareDatabase.TV_SCREEN_BASE.name
      })

      expected[hardwareDatabase.TV_SCREEN.name] = new Hardware({
        name: hardwareDatabase.TV_SCREEN.name,
        size: 2
      })

      assert.deepStrictEqual(expected, instance._components)
    })
  })
  describe('#computeTime()', () => {
    describe('operating', () => {
      const hardwaresWithKnownOperatingTime = Object.keys(knownHardwareOperatingTime)
      it('should return the known value if exists in constants', () => {
        Object.values(hardwareDamageTypes).filter(damageType => {
          return (
            damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
            damageType === hardwareDamageTypes.OPERATING_VISIO
          )
        }).forEach(damageType => {
          Object.values(hardwareDatabase).filter(json => {
            return hardwaresWithKnownOperatingTime.includes(json.name)
          }).forEach(json => {
            const instance = new Hardware({ name: json.name })
            assert.strictEqual(
              knownHardwareOperatingTime[instance._name],
              instance.computeTime(damageType)
            )
          })
        })
      })
      describe('should compute the value if not known', () => {
        it('when lifetime and operatingTimePerDay are based on DESKTOP values', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
              damageType === hardwareDamageTypes.OPERATING_VISIO
            )
          }).forEach(damageType => {
            Object.values(hardwareDatabase).filter(json => {
              return (
                !(hardwaresWithKnownOperatingTime.includes(json.name)) &&
                json.lifetime === hardwareLifetime.DESKTOP &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                8050,
                instance.computeTime(damageType)
              )
            })
          })
        })
        it('when lifetime is based on DESKTOP value and operatingTimePerDay on LOGITECH_KIT', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
              damageType === hardwareDamageTypes.OPERATING_VISIO
            )
          }).forEach(damageType => {
            Object.values(hardwareDatabase).filter(json => {
              return (
                !(hardwaresWithKnownOperatingTime.includes(json.name)) &&
                json.lifetime === hardwareLifetime.DESKTOP &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.LOGITECH_KIT
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                690,
                instance.computeTime(damageType)
              )
            })
          })
        })
        it('when lifetime is based on POWER_CABLE_ONE_METER value and operatingTimePerDay on DESKTOP', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
              damageType === hardwareDamageTypes.OPERATING_VISIO
            )
          }).forEach(damageType => {
            Object.values(hardwareDatabase).filter(json => {
              return (
                !(hardwaresWithKnownOperatingTime.includes(json.name)) &&
                json.lifetime === hardwareLifetime.POWER_CABLE_ONE_METER &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                32200,
                instance.computeTime(damageType)
              )
            })
          })
        })
      })
    })
    describe('standby', () => {
      const hardwaresWithKnownStandbyTime = Object.keys(knownHardwareStandbyTime)
      it('should return the known value if exists in constants', () => {
        Object.values(hardwareDamageTypes).filter(damageType => {
          return (
            damageType === hardwareDamageTypes.EMBODIED_STANDBY ||
            damageType === hardwareDamageTypes.OPERATING_STANDBY
          )
        }).forEach(damageType => {
          Object.values(hardwareDatabase).filter(json => {
            return hardwaresWithKnownStandbyTime.includes(json.name)
          }).forEach(json => {
            const instance = new Hardware({ name: json.name })
            assert.strictEqual(
              knownHardwareStandbyTime[instance._name],
              instance.computeTime(damageType)
            )
          })
        })
      })
      describe('should compute the value if not known', () => {
        it('when lifetime and operatingTimePerDay are based on DESKTOP values', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_STANDBY
            )
          }).forEach(damageType => {
            Object.values(hardwareDatabase).filter(json => {
              return (
                !(hardwaresWithKnownStandbyTime.includes(json.name)) &&
                json.lifetime === hardwareLifetime.DESKTOP &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                19550,
                instance.computeTime(damageType)
              )
            })
          })
        })
        it('when lifetime is based on DESKTOP value and operatingTimePerDay on LOGITECH_KIT', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_STANDBY
            )
          }).forEach(damageType => {
            Object.values(hardwareDatabase).filter(json => {
              return (
                !(hardwaresWithKnownStandbyTime.includes(json.name)) &&
                json.lifetime === hardwareLifetime.DESKTOP &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.LOGITECH_KIT
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                26910,
                instance.computeTime(damageType)
              )
            })
          })
        })
        it('when lifetime is based on POWER_CABLE_ONE_METER value and operatingTimePerDay on DESKTOP', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_STANDBY
            )
          }).forEach(damageType => {
            Object.values(hardwareDatabase).filter(json => {
              return (
                !(hardwaresWithKnownStandbyTime.includes(json.name)) &&
                json.lifetime === hardwareLifetime.POWER_CABLE_ONE_METER &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                78200,
                instance.computeTime(damageType)
              )
            })
          })
        })
      })
    })
  })
  describe('#getDamage()', () => {
    it('should return null if no available value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase).filter(json => {
          return (!json[damageType])
        }).forEach(json => {
          const instance = new Hardware({ name: json.name })
          assert.strictEqual(
            null,
            instance.getDamage(damageType)
          )
        })
      })
    })
    it('should return the unique available value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase).filter(json => {
          return (
            json[damageType] != null &&
            !(json[damageType].lower) &&
            !(json[damageType].upper)
          )
        }).forEach(json => {
          const instance = new Hardware({ name: json.name })
          assert.strictEqual(
            json[damageType],
            instance.getDamage(damageType)
          )
        })
      })
    })
    it('should return the matching lower value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase).filter(json => {
          return (
            json[damageType] != null &&
            json[damageType].lower &&
            json[damageType].upper
          )
        }).forEach(json => {
          const instance = new Hardware({ name: json.name })
          assert.strictEqual(
            json[damageType].lower,
            instance.getDamage(damageType, hardwareBound.LOWER)
          )
        })
      })
    })
    it('should return the matching upper value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase).filter(json => {
          return (
            json[damageType] != null &&
            json[damageType].lower &&
            json[damageType].upper
          )
        }).forEach(json => {
          const instance = new Hardware({ name: json.name })
          assert.strictEqual(
            json[damageType].upper,
            instance.getDamage(damageType, hardwareBound.UPPER)
          )
        })
      })
    })
    it('should return the upper value by default', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase).filter(json => {
          return (
            json[damageType] != null &&
            json[damageType].lower &&
            json[damageType].upper
          )
        }).forEach(json => {
          const instance = new Hardware({ name: json.name })
          assert.strictEqual(
            json[damageType].upper,
            instance.getDamage(damageType)
          )
        })
      })
    })
  })
  describe('#computeDamage()', () => {
    it('should return damage object with null values if no damage value available', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase)
          .filter(json => {
            return (
              !json[damageType] &&
              !(
                Array.isArray(json.components) &&
                json.components.length
              )
            )
          }).forEach(json => {
            // Compute expected damage
            const expected = new ComponentDamage()

            const instance = new Hardware({ name: json.name })
            assert.deepStrictEqual(expected, instance.computeDamage(damageType, 60))
          })
      })
    })
    it('should compute the damage of a non size-dependent hardware', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase)
          .filter(json => json[damageType] && !json.isSizeDependent)
          .forEach(json => {
            const instance = new Hardware({ name: json.name })

            // Compute expected damage
            const expected = new ComponentDamage(instance.getDamage(damageType)).mutate(categoryDamage => {
              return categoryDamage * instance._shareForVisio * 60
            })

            assert.deepStrictEqual(expected, instance.computeDamage(damageType, 60))
          })
      })
    })
    it('should compute the damage of a size-dependent hardware', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_OPERATING ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase)
          .filter(json => json[damageType] && json.isSizeDependent)
          .forEach(json => {
            const instance = new Hardware({ name: json.name })

            // Compute expected damage
            const expected = new ComponentDamage(instance.getDamage(damageType)).mutate(categoryDamage => {
              return categoryDamage * instance._shareForVisio * instance._size * 60
            })

            assert.deepStrictEqual(expected, instance.computeDamage(damageType, 60))
          })
      })
    })
    it('should compute the damage of a composite hardware', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        Object.values(hardwareDatabase)
          .filter(json => {
            return (
              Array.isArray(json.components) &&
              json.components.length
            )
          }).forEach(json => {
            // Compute expected damage
            const expected = new ComponentDamage()
            json.components.forEach(name => {
              const component = new Hardware({ name })
              const componentDamage = component.computeDamage(damageType, 60)
              Object.keys(expected).map(category => {
                expected[category] += componentDamage[category]
              })
            })

            const instance = new Hardware({ name: json.name })
            assert.deepStrictEqual(expected, instance.computeDamage(damageType, 60))
          })
      })
    })
  })
})
