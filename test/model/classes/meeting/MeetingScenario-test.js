'use strict'

const chai = require('chai')
const assert = chai.assert
const MeetingScenario = require('../../../../model/classes/meeting/MeetingScenario')
const MeetingDamage = require('../../../../model/classes/meeting/MeetingDamage')
const hardwareDatabase = require('../../../../database/meeting/hardware')
const transportDatabase = require('../../../../database/meeting/transportationMean')
const softwareDatabase = require('../../../../database/meeting/software')
const meetingScenarios = require('../../../../database/meeting/meetingScenarios')
const {
  meetingCategoryDamage,
  bounds,
  modificationTypes
} = require('../../../../constants/meeting')

describe('MeetingScenario class', () => {
  // The user who creates the meeting
  const user = 'vlegauch'
  // The meeting duration in minutes
  const meetingDuration = 120
  // Number of participants
  const numberOfParticipants = 4
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

  // Create scenario with missing components in a category
  const incompletePayload = Object.assign({}, payload)
  delete incompletePayload[meetingCategoryDamage.JOURNEY]
  const incompleteScenario = new MeetingScenario({ user, meetingDuration, numberOfParticipants, payload: incompletePayload })

  describe('#constructor()', () => {
    it('should create a MeetingScenario without components in all categories', () => {
      assert.notStrictEqual(incompleteScenario.damage.softwareDamage.components, new Map())
    })
  })
  describe('#computeDamage()', () => {
    // Create the JSON object that enables to compute meeting total damage
    const damagePayload = {
      [meetingCategoryDamage.HARDWARE]: { meetingDuration: 120, bound: bounds.UPPER },
      [meetingCategoryDamage.SOFTWARE]: { instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 120 },
      [meetingCategoryDamage.JOURNEY]: {}
    }

    // Create the expected MeetingDamage object
    const meetingDamage = new MeetingDamage({
      hardware: payload[meetingCategoryDamage.HARDWARE],
      software: payload[meetingCategoryDamage.SOFTWARE],
      journey: payload[meetingCategoryDamage.JOURNEY]
    })
    // Compute its total damage
    meetingDamage.computeDamage(damagePayload)

    // Compute meeting total damage
    meetingScenario.computeDamage(damagePayload)

    it('should compute the total damage caused by the meeting', () => {
      Object.keys(meetingScenario.damage.totalDamage).forEach(category => {
        assert.strictEqual(meetingScenario.damage.totalDamage[category], meetingDamage.totalDamage[category])
        assert.isNotNaN(meetingScenario.damage.totalDamage[category])
        assert.isNotNull(meetingScenario.damage.totalDamage[category])
        assert.notEqual(0, meetingScenario.damage.totalDamage[category])
      })
    })
    it('should compute the damage of an incomplete scenario', () => {
      const damagePayload = {
        [meetingCategoryDamage.HARDWARE]: { meetingDuration: 120, bound: bounds.UPPER },
        [meetingCategoryDamage.SOFTWARE]: { instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 120 },
        [meetingCategoryDamage.JOURNEY]: {}
      }
      incompleteScenario.computeDamage(damagePayload)
      const damage = incompleteScenario.damage.totalDamage
      const expected = incompleteScenario.damage.hardwareDamage.totalDamage.add(incompleteScenario.damage.softwareDamage.totalDamage)

      Object.keys(damage).forEach(category => {
        assert.strictEqual(damage[category], expected[category])
        assert.isNotNaN(damage[category])
        assert.isNotNull(damage[category])
        assert.notEqual(0, damage[category])
      })
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
  describe('#modify()', () => {
    describe('update a component', () => {
      it('should update a hardware component caracteristics and its damage value, total hardware category damage value and total meeting damage value', () => {
        // old hardware category total damage value
        const oldHardwareTotalDamage = meetingScenario.damage.hardwareDamage.totalDamage
        // old meeting total damage value
        const oldMeetingTotalDamage = meetingScenario.damage.totalDamage

        for (const [id, component] of meetingScenario.damage.hardwareDamage.components.entries()) {
          const payload = {
            id,
            categoryDamage: meetingCategoryDamage.HARDWARE,
            modificationType: modificationTypes.UPDATE,
            data: {
              name: hardwareDatabase.PROJECTOR.name,
              damagePayload: {
                meetingDuration: 120,
                bound: bounds.UPPER
              }
            }
          }

          // old component damage value
          const oldDamage = component.damage
          meetingScenario.modify({ payload })
          // updated component damage value
          const updatedDamage = component.damage
          // updated hardware category total damage value
          const updatedHardwareTotalDamage = meetingScenario.damage.hardwareDamage.totalDamage
          // updated meeting total damage value
          const updatedMeetingTotalDamage = meetingScenario.damage.totalDamage

          Object.keys(oldDamage).forEach(category => {
            // Tests on component damage value
            assert.notDeepEqual(oldDamage[category], updatedDamage[category])
            assert.isNotNaN(updatedDamage[category])
            assert.isNotNull(updatedDamage[category])
            assert.notEqual(0, updatedDamage[category])
            // Tests on hardware category total damage value
            assert.notDeepEqual(oldHardwareTotalDamage[category], updatedHardwareTotalDamage)
            assert.isNotNaN(updatedHardwareTotalDamage[category])
            assert.isNotNull(updatedHardwareTotalDamage[category])
            assert.notEqual(0, updatedHardwareTotalDamage[category])
            // Tests on meeting total damage value
            assert.notDeepEqual(oldMeetingTotalDamage[category], updatedMeetingTotalDamage)
            assert.isNotNaN(updatedMeetingTotalDamage[category])
            assert.isNotNull(updatedMeetingTotalDamage[category])
            assert.notEqual(0, updatedMeetingTotalDamage[category])
          })
        }
      })
      it('should update a software component caracteristics and its damage value, total software category damage value and total meeting damage value', () => {
        // old software category total damage value
        const oldSoftwareTotalDamage = meetingScenario.damage.softwareDamage.totalDamage
        // old meeting total damage value
        const oldMeetingTotalDamage = meetingScenario.damage.totalDamage

        for (const [id, component] of meetingScenario.damage.softwareDamage.components.entries()) {
          const payload = {
            id,
            categoryDamage: meetingCategoryDamage.SOFTWARE,
            modificationType: modificationTypes.UPDATE,
            data: {
              name: softwareDatabase.HANGOUTS.name,
              damagePayload: {
                instancesNumber: 5,
                bandwithBound: bounds.UPPER,
                networkBound: bounds.UPPER,
                meetingDuration: 120
              }
            }
          }

          // old component damage value
          const oldDamage = component.damage
          meetingScenario.modify({ payload })
          // updated component damage value
          const updatedDamage = component.damage
          // updated software category total damage value
          const updatedSoftwareTotalDamage = meetingScenario.damage.softwareDamage.totalDamage
          // updated meeting total damage value
          const updatedMeetingTotalDamage = meetingScenario.damage.totalDamage

          // Test on new software name
          assert.deepStrictEqual(component.name, softwareDatabase.HANGOUTS.name)
          Object.keys(oldDamage).forEach(category => {
            // Tests on component damage value
            assert.notDeepEqual(oldDamage[category], updatedDamage[category])
            assert.isNotNaN(updatedDamage[category])
            assert.isNotNull(updatedDamage[category])
            assert.notEqual(0, updatedDamage[category])
            // Tests on software category total damage value
            assert.notDeepEqual(oldSoftwareTotalDamage[category], updatedSoftwareTotalDamage)
            assert.isNotNaN(updatedSoftwareTotalDamage[category])
            assert.isNotNull(updatedSoftwareTotalDamage[category])
            assert.notEqual(0, updatedSoftwareTotalDamage[category])
            // Tests on meeting total damage value
            assert.notDeepEqual(oldMeetingTotalDamage[category], updatedMeetingTotalDamage)
            assert.isNotNaN(updatedMeetingTotalDamage[category])
            assert.isNotNull(updatedMeetingTotalDamage[category])
            assert.notEqual(0, updatedMeetingTotalDamage[category])
          })
        }
      })
      it('should update a journey component caracteristics and its damage value, total journey category damage value and total meeting damage value', () => {
        // old journey category total damage value
        const oldJourneyTotalDamage = meetingScenario.damage.journeyDamage.totalDamage
        // old meeting total damage value
        const oldMeetingTotalDamage = meetingScenario.damage.totalDamage

        for (const [id, component] of meetingScenario.damage.journeyDamage.components.entries()) {
          const payload = {
            id,
            categoryDamage: meetingCategoryDamage.JOURNEY,
            modificationType: modificationTypes.UPDATE,
            data: {
              passenger: 'Nouveau passager',
              mean: transportDatabase.PLANE_INTERCONTINENTAL_ONE_PERSON_KM.name,
              distance: 1000,
              numberOfPeople: 1
            }
          }

          // old component damage value
          const oldDamage = component.damage
          meetingScenario.modify({ payload })
          // updated component damage value
          const updatedDamage = component.damage
          // updated jouney category total damage value
          const updatedJourneyTotalDamage = meetingScenario.damage.journeyDamage.totalDamage
          // updated meeting total damage value
          const updatedMeetingTotalDamage = meetingScenario.damage.totalDamage

          // Test on new journey french name
          const expectedNewFrench = 'Trajet de Nouveau passager en ' + transportDatabase.PLANE_INTERCONTINENTAL_ONE_PERSON_KM.french + ' de 1000 km.'
          assert.deepStrictEqual(component.french, expectedNewFrench)
          Object.keys(oldDamage).forEach(category => {
            // Tests on component damage value
            assert.notDeepEqual(oldDamage[category], updatedDamage[category])
            assert.isNotNaN(updatedDamage[category])
            assert.isNotNull(updatedDamage[category])
            assert.notEqual(0, updatedDamage[category])
            // Tests on software category total damage value
            assert.notDeepEqual(oldJourneyTotalDamage[category], updatedJourneyTotalDamage)
            assert.isNotNaN(updatedJourneyTotalDamage[category])
            assert.isNotNull(updatedJourneyTotalDamage[category])
            assert.notEqual(0, updatedJourneyTotalDamage[category])
            // Tests on meeting total damage value
            assert.notDeepEqual(oldMeetingTotalDamage[category], updatedMeetingTotalDamage)
            assert.isNotNaN(updatedMeetingTotalDamage[category])
            assert.isNotNull(updatedMeetingTotalDamage[category])
            assert.notEqual(0, updatedMeetingTotalDamage[category])
          })
        }
      })
      it('should update meeting duration, number of participants and meeting damage values', () => {
        const damagePayload = {
          [meetingCategoryDamage.HARDWARE]: { meetingDuration: 240, bound: bounds.UPPER },
          [meetingCategoryDamage.SOFTWARE]: { instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 240 },
          [meetingCategoryDamage.JOURNEY]: {}
        }
        // Old meeting damage values
        const oldMeetingTotalDamage = meetingScenario.damage.totalDamage
        const oldHardwareTotalDamage = meetingScenario.damage.hardwareDamage.totalDamage

        const oldSoftwareTotalDamage = meetingScenario.damage.softwareDamage.totalDamage
        const oldJourneyTotalDamage = meetingScenario.damage.journeyDamage.totalDamage

        meetingScenario.modify({ meetingDuration: 240, numberOfParticipants: 10, damagePayload })

        // Updated meeting damage values
        const updatedMeetingTotalDamage = meetingScenario.damage.totalDamage
        const updatedHardwareTotalDamage = meetingScenario.damage.hardwareDamage.totalDamage
        const updatedSoftwareTotalDamage = meetingScenario.damage.softwareDamage.totalDamage
        const updatedJourneyTotalDamage = meetingScenario.damage.journeyDamage.totalDamage

        Object.keys(oldMeetingTotalDamage).forEach(category => {
          assert.isAbove(updatedHardwareTotalDamage[category], oldHardwareTotalDamage[category])
          assert.isAbove(updatedSoftwareTotalDamage[category], oldSoftwareTotalDamage[category])
          assert.isAbove(updatedMeetingTotalDamage[category], oldMeetingTotalDamage[category])
          assert.deepStrictEqual(updatedJourneyTotalDamage[category], oldJourneyTotalDamage[category])

          assert.isNotNaN(updatedHardwareTotalDamage[category])
          assert.isNotNaN(updatedSoftwareTotalDamage[category])
          assert.isNotNaN(updatedJourneyTotalDamage[category])
          assert.isNotNaN(updatedMeetingTotalDamage[category])

          assert.isNotNull(updatedHardwareTotalDamage[category])
          assert.isNotNull(updatedSoftwareTotalDamage[category])
          assert.isNotNull(updatedJourneyTotalDamage[category])
          assert.isNotNull(updatedMeetingTotalDamage[category])

          assert.notEqual(0, updatedHardwareTotalDamage[category])
          assert.notEqual(0, updatedSoftwareTotalDamage[category])
          assert.notEqual(0, updatedJourneyTotalDamage[category])
          assert.notEqual(0, updatedMeetingTotalDamage[category])
        })
      })
    })
  })
})
