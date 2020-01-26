'use strict'

const assert = require('assert')
const MeetingScenario = require('../../../../model/classes/meeting/MeetingScenario')
const MeetingDamage = require('../../../../model/classes/meeting/MeetingDamage')
const hardwareDatabase = require('../../../../database/meeting/hardware')
const transportDatabase = require('../../../../database/meeting/transportationMean')
const softwareDatabase = require('../../../../database/meeting/software')
const meetingScenarios = require('../../../../database/meeting/meetingScenarios')
const {
  meetingCategoryDamage,
  bounds
} = require('../../../../constants/meeting')

describe('MeetingScenario class', () => {
  // The user who creates the meeting
  const user = 'vlegauch'
  // The meeting duration in minutes
  const meetingDuration = 90
  // Number of participants
  const numberOfParticipants = 5
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
  const meetingScenario = new MeetingScenario({ user, meetingDuration, numberOfParticipants, payload })

  // Create the JSON object that enables to compute meeting total damage
  const damagePayload = {
    [meetingCategoryDamage.HARDWARE]: { meetingDuration: 90, bound: bounds.UPPER },
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
  describe('#computeDamage()', () => {
    it('should compute the total damage caused by the meeting', () => {
      assert.deepStrictEqual(
        meetingScenario.damage.totalDamage,
        meetingDamage.totalDamage
      )
    })
  })
  describe('#generateAlternatives()', () => {
    it('should create two alternative scenarios', () => {
      const oldSize = meetingScenarios.size
      meetingScenario.generateAlternatives()
      assert.deepStrictEqual(
        meetingScenarios.size,
        oldSize + 2
      )
    })
  })
  describe('#create()', () => {
    // Create the meeting scenario
    it('shoud create a meeting scenario and add it the database', () => {
      const oldSize = meetingScenarios.size
      MeetingScenario.create({ user, meetingDuration, numberOfParticipants, payload })
      assert.deepStrictEqual(
        meetingScenarios.size,
        oldSize + 1
      )
    })
  })

  describe('#read()', () => {
    it('should read a meetingScenario thanks to its id', () => {
      meetingScenarios.forEach(element => {
        const id = element.id

        assert.deepStrictEqual(
          MeetingScenario.read(id),
          meetingScenarios.get(id)
        )
      })
    })
  })
  describe('#remove()', () => {
    it('should remove a meetingScenario thanks to its id', () => {
      meetingScenarios.forEach(element => {
        const id = element.id
        MeetingScenario.remove(id)

        assert.deepStrictEqual(
          meetingScenarios.get(id),
          undefined
        )
      })
    })
  })
})
