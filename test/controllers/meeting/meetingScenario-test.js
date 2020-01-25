'use strict'

const assert = require('assert')
const { create, read, remove } = require('../../../controllers/meeting/meetingScenario')
const { meetingCategoryDamage } = require('../../../constants/meeting')
const hardwareDatabase = require('../../../database/meeting/hardware')
const transportDatabase = require('../../../database/meeting/transportationMean')
const softwareDatabase = require('../../../database/meeting/software')
const meetingScenarios = require('../../../database/meeting/meetingScenarios')

describe('meetingScenario controller', () => {
  // The user who creates the meeting
  const user = 'vlegauch'
  // The meeting duration in minutes
  const meetingDuration = 120
  // The JSON object that enables to creates components linked to the meeting
  const payload = {
    [meetingCategoryDamage.HARDWARE]: [
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.LAPTOP.name },
      { name: hardwareDatabase.LOGITECH_KIT.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.METAL_STRUCTURE.name }
    ],
    [meetingCategoryDamage.SOFTWARE]: [{ name: softwareDatabase.SKYPE.name }],
    [meetingCategoryDamage.JOURNEY]: [
      {
        passenger: 'Passenger 1',
        mean: transportDatabase.CAR_ELECTRIC_ONE_KM.name,
        distance: 120,
        numberOfPeople: 4
      },
      {
        passenger: 'Passenger 1',
        mean: transportDatabase.BUS_LARGE_DISTANCE_ONE_PERSON_KM.name,
        distance: 40,
        numberOfPeople: 1
      },
      {
        passenger: 'Passenger 2',
        mean: transportDatabase.CAR_ELECTRIC_ONE_KM.name,
        distance: 120,
        numberOfPeople: 4
      },
      {
        passenger: 'Passenger 2',
        mean: transportDatabase.TRAIN_REGIONAL_ONE_PERSON_KM.name,
        distance: 300,
        numberOfPeople: 1
      },
      {
        passenger: 'Passenger 2',
        mean: transportDatabase.BIKE_ONE_PERSON_ONE_KM.name,
        distance: 10,
        numberOfPeople: 1
      }
    ]
  }
  create({ user, meetingDuration, payload })
  describe('#create()', () => {
    // Create the meeting scenario
    it('shoud create a meeting scenario and add it the database', () => {
      assert.deepStrictEqual(
        meetingScenarios.size,
        1
      )
    })
  })

  describe('#read()', () => {
    it('should read a meetingScenario thanks to its id', () => {
      meetingScenarios.forEach(element => {
        const id = element.id

        assert.deepStrictEqual(
          read(id),
          meetingScenarios.get(id)
        )
      })
    })
  })
  describe('#remove()', () => {
    it('should remove a meetingScenario thanks to its id', () => {
      meetingScenarios.forEach(element => {
        const id = element.id
        remove(id)

        assert.deepStrictEqual(
          meetingScenarios.get(id),
          undefined
        )
      })
    })
  })
})
