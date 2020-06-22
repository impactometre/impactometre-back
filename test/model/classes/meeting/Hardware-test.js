'use strict';

const chai = require('chai');
const hardwareDatabase = require('../../../../database/meeting/hardware');
const Hardware = require('../../../../model/classes/meeting/Hardware');
const Damage = require('../../../../model/classes/shared/Damage');
const {
  knownOperatingTimeOverLife,
  hardwareLifetime,
  hardwareOperatingTimePerDay,
  bounds,
  hardwareDamageTypes,
  hourToMinutes
} = require('../../../../constants/meeting');

const assert = chai.assert;

describe('Hardware class', () => {
  describe('#constructor()', () => {
    it('should create an Hardware component for each non-composite hardware', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          // Either there is no components key
          !json.components ||
          // Either the value is an empty object
          Object.keys(json.components).length === 0
        )
      }).forEach(json => {
        const component = new Hardware({ name: json.name });
        assert.deepStrictEqual({}, component._components)
      })
    });
    it('should create an Hardware component for each composite hardware', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.components &&
          Object.keys(json.components).length !== 0
        )
      }).forEach(json => {
        const component = new Hardware({ name: json.name });

        // Compute expected components
        const expected = {};
        for (const [name, quantity] of Object.entries(json.components)) {
          expected[name] = new Hardware({ name, quantity })
        }

        // Delete components ids because they are always different (they are uniq)
        Object.values(expected).forEach(component => {
          delete component._id
        });

        Object.values(component._components).forEach(component => {
          delete component._id
        });

        assert.deepStrictEqual(expected, component._components)
      })
    });
    it('should create a composite hardware component using components payload', () => {
      const componentsPayload = {};
      componentsPayload[hardwareDatabase.TV_SCREEN_ONE_METER_SQUARE.name] = {
        name: hardwareDatabase.TV_SCREEN_ONE_METER_SQUARE.name,
        size: 2
      };

      const component = new Hardware({
        name: hardwareDatabase.TV.name,
        componentsPayload
      });

      // Compute expected components
      const expected = {};
      expected[hardwareDatabase.TV_BASE.name] = new Hardware({
        name: hardwareDatabase.TV_BASE.name
      });

      expected[hardwareDatabase.TV_SCREEN_ONE_METER_SQUARE.name] = new Hardware({
        name: hardwareDatabase.TV_SCREEN_ONE_METER_SQUARE.name,
        size: 2
      });

      // Delete components ids because they are always different (they are uniq)
      Object.values(expected).forEach(component => {
        delete component._id
      });

      Object.values(component._components).forEach(component => {
        delete component._id
      });

      assert.deepStrictEqual(expected, component._components)
    });
    it('should create a hardware for all hardwares which embodied is assimilated to another one', () => {
      Object.values(hardwareDatabase)
        .filter(json => json.embodiedAssimilatedTo)
        .forEach(json => {
          const instance = new Hardware({ name: json.name });

          assert.deepStrictEqual(
            instance.embodied,
            hardwareDatabase[json.embodiedAssimilatedTo].embodied
          );
          Object.values(instance.embodied).forEach(categoryDamageValue => {
            assert.isNotNaN(categoryDamageValue)
          })
        })
    })
  });
  describe('#computeVisioOrStandbyTimeOverLife()', () => {
    describe('operating', () => {
      const hardwaresWithKnownOperatingTime = Object.keys(knownOperatingTimeOverLife);
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
            const component = new Hardware({ name: json.name });
            assert.strictEqual(
              knownOperatingTimeOverLife[component._name],
              component.computeVisioOrStandbyTimeOverLife(damageType)
            )
          })
        })
      });
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
              const component = new Hardware({ name: json.name });
              assert.strictEqual(
                8050,
                component.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        });
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
              const component = new Hardware({ name: json.name });
              assert.strictEqual(
                690,
                component.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        });
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
              const component = new Hardware({ name: json.name });
              assert.strictEqual(
                32200,
                component.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        })
      })
    });
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
              const component = new Hardware({ name: json.name });
              assert.strictEqual(
                19550,
                component.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        });
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
              const component = new Hardware({ name: json.name });
              assert.strictEqual(
                26910,
                component.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        });
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
              const component = new Hardware({ name: json.name });
              assert.strictEqual(
                78200,
                component.computeVisioOrStandbyTimeOverLife(damageType)
              )
            })
          })
        })
      })
    })
  });
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
          return (!json[damageType] && !json.embodiedAssimilatedTo)
        }).forEach(json => {
          const component = new Hardware({ name: json.name });
          assert.strictEqual(
            null,
            component.getTypedDamage(damageType)
          )
        })
      })
    });
    it('should get assimilated embodied damages', () => {
      Object.values(hardwareDatabase)
        .filter(json => json.embodiedAssimilatedTo)
        .forEach(json => {
          const instance = new Hardware({ name: json.name });

          const weight = (json.weight.upper && json.weight.lower)
            ? json.weight.upper
            : json.weight;

          const expected = hardwareDatabase[json.embodiedAssimilatedTo].embodied;
          Object.keys(expected).map(category => {
            expected[category] *= weight
          });

          assert.deepStrictEqual(
            instance.getTypedDamage(hardwareDamageTypes.EMBODIED_VISIO),
            expected
          );
          Object.values(expected).forEach(categoryDamageValue => {
            assert.isNotNaN(categoryDamageValue);
            assert.isNotNull(categoryDamageValue);
            assert.notEqual(0, categoryDamageValue)
          })
        })
    });
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
          const component = new Hardware({ name: json.name });
          assert.strictEqual(
            json[damageType],
            component.getTypedDamage(damageType)
          )
        })
      })
    });
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
          const component = new Hardware({ name: json.name });
          assert.strictEqual(
            json[damageType].lower,
            component.getTypedDamage(damageType, bounds.LOWER)
          )
        })
      })
    });
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
          const component = new Hardware({ name: json.name });
          assert.strictEqual(
            json[damageType].upper,
            component.getTypedDamage(damageType, bounds.UPPER)
          )
        })
      })
    });
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
          const component = new Hardware({ name: json.name });
          assert.strictEqual(
            json[damageType].upper,
            component.getTypedDamage(damageType)
          )
        })
      })
    })
  });
  describe('#computeTypedDamage()', () => {
    const meetingDuration = 60;
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
              !json[damageType] && !json.embodiedAssimilatedTo &&
              !(
                Array.isArray(json.components) &&
                json.components.length
              )
            )
          }).forEach(json => {
            const component = new Hardware({ name: json.name });
            const damage = component.computeTypedDamage(damageType, meetingDuration);

            Object.keys(damage).forEach(category => {
              assert.strictEqual(damage[category], 0)
            })
          })
      })
    });
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
            const component = new Hardware({ name: json.name });

            // Compute expected damage
            const expected = new Damage({ component, ...component.getTypedDamage(damageType) });
            if (
              damageType === hardwareDamageTypes.OPERATING_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_VISIO
            ) {
              expected.mutate(category => {
                expected[category] *= component.shareForVisio * component.getVisioOrStandbyDuration(damageType, meetingDuration)
              })
            } else {
              expected.mutate(category => {
                expected[category] *= component._shareForVisio;
                expected[category] /= component.computeVisioOrStandbyTimeOverLife(damageType);
                expected[category] /= hourToMinutes;
                expected[category] *= component.getVisioOrStandbyDuration(damageType, meetingDuration)
              })
            }

            const damage = component.computeTypedDamage(damageType, meetingDuration);
            Object.keys(damage).forEach(category => {
              assert.strictEqual(damage[category], expected[category]);
              assert.isNotNaN(damage[category]);
              assert.isNotNull(damage[category]);
              assert.notEqual(0, damage[category])
            })
          })
      })
    });
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
            const component = new Hardware({ name: json.name });

            // Compute expected damage
            const expected = new Damage({ component, ...component.getTypedDamage(damageType) });
            if (
              damageType === hardwareDamageTypes.OPERATING_STANDBY ||
              damageType === hardwareDamageTypes.OPERATING_VISIO
            ) {
              expected.mutate(category => {
                expected[category] *= component.shareForVisio * component.size * component.getVisioOrStandbyDuration(damageType, meetingDuration)
              })
            } else {
              expected.mutate(category => {
                expected[category] *= component._shareForVisio * component.size;
                expected[category] /= component.computeVisioOrStandbyTimeOverLife(damageType);
                expected[category] /= hourToMinutes;
                expected[category] *= component.getVisioOrStandbyDuration(damageType, meetingDuration)
              })
            }

            const damage = component.computeTypedDamage(damageType, meetingDuration);
            Object.keys(damage).forEach(category => {
              assert.strictEqual(damage[category], expected[category]);
              assert.isNotNaN(damage[category]);
              assert.isNotNull(damage[category]);
              assert.notEqual(0, damage[category])
            })
          })
      })
    });
    it('should compute the damage of a composite hardware', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        Object.values(hardwareDatabase)
          .filter(json => {
            return (
              Array.isArray(json.components) &&
              json.components.length
            )
          }).forEach(json => {
            const component = new Hardware({ name: json.name });

            // Compute expected damage
            const expected = new Damage({ component });
            json.components.forEach(name => {
              const component = new Hardware({ name });
              const componentDamage = component.computeTypedDamage(damageType, meetingDuration);

              Object.keys(expected).map(category => {
                expected[category] += componentDamage[category]
              })
            });

            assert.deepStrictEqual(expected, component.computeTypedDamage(damageType, meetingDuration))
          })
      })
    });
    it('if the meeting is twice longer the damage should be twice bigger', () => {
      Object.values(hardwareDamageTypes).forEach(damageType => {
        Object.values(hardwareDatabase)
          .filter(json => new Hardware(json)[damageType])
          .forEach(json => {
            const component = new Hardware(json);
            const simple = component.computeTypedDamage(damageType, meetingDuration);

            // Compute expected
            const double = component.computeTypedDamage(damageType, meetingDuration * 2);

            Object.keys(double).forEach(category => {
              assert.strictEqual(simple[category] * 2, double[category])
            })
          })
      })
    })
  });
  describe('#computeDamage()', () => {
    const meetingDuration = 60;
    const component = new Hardware(hardwareDatabase.LAPTOP);
    it('if the meeting is twice longer the damage should be twice bigger', () => {
      component.computeDamage({ meetingDuration });
      const simple = component.damage;

      // Compute expected
      component.computeDamage({ meetingDuration: meetingDuration * 2 });
      const double = component.damage;

      Object.keys(double).forEach(category => {
        assert.strictEqual(double[category], simple[category] * 2);
        assert.isNotNaN(double[category]);
        assert.isNotNull(double[category]);
        assert.notEqual(0, double[category])
      })
    });
    it('the lower bound damage should be lower than the default (upper) damage', () => {
      const component = new Hardware(hardwareDatabase.CODEC);
      component.computeDamage({ meetingDuration, bound: bounds.LOWER });
      const lowerBound = component.damage;
      component.computeDamage({ meetingDuration });
      const defaultBound = component.damage;

      Object.keys(defaultBound).forEach(category => {
        assert.isAbove(defaultBound[category], lowerBound[category])
      })
    });
    it('should compute the damage of a composite hardware with x instances of the same component (x > 1)', () => {
      const json = hardwareDatabase.LOGITECH_KIT;
      const instance = new Hardware({ name: json.name });
      // Compute expected damage
      let expected = new Damage();
      for (const [name, quantity] of Object.entries(json.components)) {
        const component = new Hardware({ name, quantity: 1 });
        component.computeDamage({ meetingDuration });
        component.damage.mutate(category => {
          component.damage[category] *= quantity
        });

        expected = expected.add(component.damage)
      }

      instance.computeDamage({ meetingDuration });
      const actual = instance.damage;

      assert.deepStrictEqual(actual, expected);
      Object.values(actual).forEach(categoryDamageValue => {
        assert.isNotNaN(categoryDamageValue);
        assert.isNotNull(categoryDamageValue);
        assert.notEqual(0, categoryDamageValue)
      })
    });
    it('should compute the damage of each composite hardware', () => {
      Object.values(hardwareDatabase).filter(json => {
        return (
          json.components &&
          Object.keys(json.components).length !== 0
        )
      }).forEach(json => {
        const instance = new Hardware({ name: json.name });

        // Compute expected damage
        let expected = new Damage();
        for (const [name, quantity] of Object.entries(json.components)) {
          const component = new Hardware({ name, quantity });
          component.computeDamage({ meetingDuration });
          expected = expected.add(component.damage)
        }

        instance.computeDamage({ meetingDuration });
        const actual = instance.damage;
        assert.deepStrictEqual(actual, expected);

        Object.values(actual).forEach(categoryDamageValue => {
          assert.isNotNaN(categoryDamageValue);
          assert.isNotNull(categoryDamageValue);
          assert.notEqual(0, categoryDamageValue)
        })
      })
    })
  })
});
