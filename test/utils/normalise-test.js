'used strict'

const assert = require('assert')
const hardwareDatabase = require('../../database/meeting/hardware')
const softwareDatabase = require('../../database/meeting/software')
const transportDatabase = require('../../database/meeting/transportationMean')
const meetingScenarios = require('../../database/meeting/meetingScenarios')
const MeetingScenario = require('../../model/classes/meeting/MeetingScenario')
const {
  meetingCategoryDamage,
  bounds
} = require('../../constants/meeting')
const {
  normalise,
  normaliseDamages
} = require('../../utils/normalise')

describe('Normalise utilitary function', () => {
  describe('#normalise()', () => {
    const originalArray = [20, 18, 14, 6, 2]
    const normalisedArray = [100, 90, 70, 30, 10]
    it('should normalise the array', () => {
      assert.deepStrictEqual(
        normalise(originalArray),
        normalisedArray
      )
    })
  })
})
describe('Normalise damages function', () => {
  describe('#normaliseDamages()', () => {
    it('should return an array with normalised values for several meeting scenarios', () => {
      // All necessary data needed to compute meeting total damage
      const damagePayload = {
        [meetingCategoryDamage.HARDWARE]: { meetingDuration: 90, bound: bounds.UPPER },
        [meetingCategoryDamage.SOFTWARE]: { instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 120 },
        [meetingCategoryDamage.JOURNEY]: {}
      }
      // The user who creates the meeting
      const user = 'vlegauch'
      // The meeting duration in minutes
      const meetingDuration = 120
      // Number of participants
      const numberOfParticipants = 5
      // The JSON object that enables to creates components linked to the meeting
      const firstPayload = {
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
      const firstMeetingScenario = MeetingScenario.create({ user, meetingDuration, numberOfParticipants, payload: firstPayload })
      firstMeetingScenario.computeDamage(damagePayload)
      const secoundPayload = {
        [meetingCategoryDamage.HARDWARE]: [
          { name: hardwareDatabase.LAPTOP.name },
          { name: hardwareDatabase.LAPTOP.name },
          { name: hardwareDatabase.LAPTOP.name },
          { name: hardwareDatabase.PROJECTOR.name },
          { name: hardwareDatabase.PROJECTOR.name }
        ],
        [meetingCategoryDamage.SOFTWARE]: [{ name: softwareDatabase.HANGOUTS.name }],
        [meetingCategoryDamage.JOURNEY]: [
          {
            passenger: 'Passenger 1',
            mean: transportDatabase.CAR_ELECTRIC_ONE_KM.name,
            distance: 120,
            numberOfPeople: 4
          },
          {
            passenger: 'Passenger 2',
            mean: transportDatabase.TRAIN_HIGH_SPEED_ONE_PERSON_KM.name,
            distance: 300,
            numberOfPeople: 1
          },
          {
            passenger: 'Passenger 2',
            mean: transportDatabase.TRAMWAY_ONE_PERSON_KM.name,
            distance: 20,
            numberOfPeople: 1
          }
        ]
      }
      const secoundMeetingScenario = MeetingScenario.create({ user, meetingDuration, numberOfParticipants, payload: secoundPayload })
      secoundMeetingScenario.computeDamage(damagePayload)
      secoundMeetingScenario.generateAlternatives()
      meetingScenarios.forEach(meetingScenario => {
        meetingScenario.computeDamage(damagePayload)
      })
      normaliseDamages(meetingScenarios.values())
    })
  })
})
