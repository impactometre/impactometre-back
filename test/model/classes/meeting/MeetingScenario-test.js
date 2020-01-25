'use strict'

const assert = require('assert')
const MeetingScenario = require('../../../../model/classes/meeting/MeetingScenario')
const MeetingDamage = require('../../../../model/classes/meeting/MeetingDamage')
const hardwareDatabase = require('../../../../model/database/meeting/hardware')
const transportDatabase = require('../../../../model/database/meeting/transportationMean')
const softwareDatabase = require('../../../../model/database/meeting/software')
const {
  meetingCategoryDamage,
  bounds
} = require('../../../../constants/meeting')

describe('MeetingScenario class', () => {
  describe('#computeDamage()', () => {
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
    // Create the MeetingScenario object
    const meetingScenario = new MeetingScenario({ user, meetingDuration, payload })

    // Create the JSON object that enables to compute meeting total damage
    const damagePayload = {
      [meetingCategoryDamage.HARDWARE]: { meetingDuration: 120, bound: bounds.UPPER },
      [meetingCategoryDamage.SOFTWARE]: { instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 120 },
      [meetingCategoryDamage.JOURNEY]: {}
    }

    // Create the expected MeetingDamage object
    const meetingDamage = new MeetingDamage({
      hardwareComponents: payload[meetingCategoryDamage.HARDWARE],
      softwareComponents: payload[meetingCategoryDamage.SOFTWARE],
      journeyComponents: payload[meetingCategoryDamage.JOURNEY]
    })
    // Compute its total damage
    meetingDamage.computeDamage(damagePayload)

    // Compute meeting total damage
    meetingScenario.computeDamage(damagePayload)

    it('should compute the total damage caused by the meeting', () => {
      assert.deepStrictEqual(
        meetingScenario.damage.totalDamage,
        meetingDamage.totalDamage
      )
    })
  })
})
