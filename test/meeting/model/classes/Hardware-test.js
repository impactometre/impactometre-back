'use strict'

const chai = require('chai')
const hardwareDatabase = require('../../../../model/meeting/database/hardware')
const Hardware = require('../../../../model/meeting/classes/Hardware')
const ComponentDamage = require('../../../../model/meeting/classes/ComponentDamage')
const {
  knownOperatingTimeOverLife,
  hardwareLifetime,
  hardwareOperatingTimePerDay,
  bounds,
  hardwareDamageTypes,
  hourToMinutes
} = require('../../../constants/meeting')

const assert = chai.assert

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
      expected[hardwareDatabase.TV_BASE.name] = new Hardware({
        name: hardwareDatabase.TV_BASE.name
      })

      expected[hardwareDatabase.TV_SCREEN.name] = new Hardware({
        name: hardwareDatabase.TV_SCREEN.name,
        size: 2
      })

      assert.deepStrictEqual(expected, instance._components)
    })
  })
  describe('#computeVisioOrStandbyTimeOverLife()', () => {
    describe('operating', () => {
      const hardwaresWithKnownOperatingTime = Object.keys(knownOperatingTimeOverLife)
      it('should return the known value if exists in constants', () => {
        Object.values(hardwareDamageTypes).filter(damageType => {
          return (
            damageType === hardwareDamageTypes.EMBODIED_VISIO ||
            damageType === hardwareDamageTypes.OPERATING_VISIO
          )
        }).forEach(damageType => {
          Object.values(hardwareDatabase).filter(json => {
            return hardwaresWithKnownOperatingTime.includes(json.name)
          }).forEach(json => {
            const instance = new Hardware({ name: json.name })
            assert.strictEqual(
              knownOperatingTimeOverLife[instance._name],
              instance.computeVisioOrStandbyTimeOverLife(damageType)
            )
          })
        })
      })
      describe('should compute the value if not known', () => {
        it('when lifetime and operatingTimePerDay are based on DESKTOP values', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
                instance.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        })
        it('when lifetime is based on DESKTOP value and operatingTimePerDay on LOGITECH_KIT', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
                instance.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        })
        it('when lifetime is based on POWER_CABLE_ONE_METER value and operatingTimePerDay on DESKTOP', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
                instance.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        })
      })
    })
    describe('standby', () => {
      describe('should compute the value', () => {
        it('when lifetime and operatingTimePerDay are based on DESKTOP values', () => {
          Object.values(hardwareDamageTypes).filter(damageType => {
            return (
              damageType === hardwareDamageTypes.EMBODIED_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_STANDBY
            )
          }).forEach(damageType => {
            Object.values(hardwareDatabase).filter(json => {
              return (
                json.lifetime === hardwareLifetime.DESKTOP &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                19550,
                instance.computeVisioOrStandbyTimeOverLife(damageType)
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
                json.lifetime === hardwareLifetime.DESKTOP &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.LOGITECH_KIT
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                26910,
                instance.computeVisioOrStandbyTimeOverLife(damageType)
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
                json.lifetime === hardwareLifetime.POWER_CABLE_ONE_METER &&
                json.operatingTimePerDay === hardwareOperatingTimePerDay.DESKTOP
              )
            }).forEach(json => {
              const instance = new Hardware({ name: json.name })
              assert.strictEqual(
                78200,
                instance.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        })
      })
    })
  })
  describe('#getTypedDamage()', () => {
    it('should return null if no available value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
            instance.getTypedDamage(damageType)
          )
        })
      })
    })
    it('should return the unique available value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
            instance.getTypedDamage(damageType)
          )
        })
      })
    })
    it('should return the matching lower value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
            instance.getTypedDamage(damageType, bounds.LOWER)
          )
        })
      })
    })
    it('should return the matching upper value', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
            instance.getTypedDamage(damageType, bounds.UPPER)
          )
        })
      })
    })
    it('should return the upper value by default', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
            instance.getTypedDamage(damageType)
          )
        })
      })
    })
  })
  describe('#computeTypedDamage()', () => {
    const meetingDuration = 60
    it('should return damage object with null values if no damage value available', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
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
            assert.deepStrictEqual(expected, instance.computeTypedDamage(damageType, meetingDuration))
          })
      })
    })
    it('should compute the damage of a non size-dependent hardware', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase)
          .filter(json => json[damageType] && !json.isSizeDependent)
          .forEach(json => {
            const instance = new Hardware({ name: json.name })

            // Compute expected damage
            const expected = new ComponentDamage(instance.getTypedDamage(damageType))
            if (
              damageType === hardwareDamageTypes.OPERATING_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_VISIO
            ) {
              expected.mutate(category => {
                return expected[category] * instance.shareForVisio * instance.getVisioOrStandbyDuration(damageType, meetingDuration)
              })
            } else {
              expected.mutate(category => {
                expected[category] *= instance._shareForVisio
                expected[category] /= instance.computeVisioOrStandbyTimeOverLife(damageType)
                expected[category] /= hourToMinutes
                expected[category] *= instance.getVisioOrStandbyDuration(damageType, meetingDuration)

                return expected[category]
              })
            }

            assert.deepStrictEqual(expected, instance.computeTypedDamage(damageType, meetingDuration))
          })
      })
    })
    it('should compute the damage of a size-dependent hardware', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        if (
          damageType === hardwareDamageTypes.EMBODIED_VISIO ||
          damageType === hardwareDamageTypes.EMBODIED_STANDBY
        ) {
          damageType = 'embodied'
        }

        Object.values(hardwareDatabase)
          .filter(json => json[damageType] && json.isSizeDependent)
          .forEach(json => {
            const instance = new Hardware({ name: json.name })

            // Compute expected damage
            const expected = new ComponentDamage(instance.getTypedDamage(damageType))
            if (
              damageType === hardwareDamageTypes.OPERATING_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_VISIO
            ) {
              expected.mutate(category => {
                return expected[category] * instance.shareForVisio * instance.size * instance.getVisioOrStandbyDuration(damageType, meetingDuration)
              })
            } else {
              expected.mutate(category => {
                expected[category] *= instance._shareForVisio * instance.size
                expected[category] /= instance.computeVisioOrStandbyTimeOverLife(damageType)
                expected[category] /= hourToMinutes
                expected[category] *= instance.getVisioOrStandbyDuration(damageType, meetingDuration)

                return expected[category]
              })
            }

            assert.deepStrictEqual(expected, instance.computeTypedDamage(damageType, meetingDuration))
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
              const componentDamage = component.computeTypedDamage(damageType, meetingDuration)
              Object.keys(expected).map(category => {
                expected[category] += componentDamage[category]
              })
            })

            const instance = new Hardware({ name: json.name })
            assert.deepStrictEqual(expected, instance.computeTypedDamage(damageType, meetingDuration))
          })
      })
    })
    it('if the meeting is twice longer the damage should be twice bigger', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        Object.values(hardwareDatabase)
          .filter(json => new Hardware(json)[damageType])
          .forEach(json => {
            const instance = new Hardware(json)
            const simple = instance.computeTypedDamage(damageType, meetingDuration)

            // Compute expected
            const double = instance.computeTypedDamage(damageType, meetingDuration * 2)

            Object.keys(double).forEach(category => {
              assert.strictEqual(simple[category] * 2, double[category])
            })
          })
      })
    })
  })
  describe('#computeDamage()', () => {
    const meetingDuration = 60
    const instance = new Hardware(hardwareDatabase.LAPTOP)
    it('if the meeting is twice longer the damage should be twice bigger', () => {
      const simple = instance.computeDamage(meetingDuration)

      // Compute expected
      const double = instance.computeDamage(meetingDuration * 2)

      Object.keys(double).forEach(category => {
        assert.strictEqual(double[category], simple[category] * 2)
      })
    })
    it('the lower bound damage should be lower than the default (upper) damage', () => {
      const instance = new Hardware(hardwareDatabase.CODEC)
      const lowerBound = instance.computeDamage(meetingDuration, bounds.LOWER)
      const defaultBound = instance.computeDamage(meetingDuration)

      Object.keys(defaultBound).forEach(category => {
        assert.isAbove(defaultBound[category], lowerBound[category])
      })
    })
  })
})
