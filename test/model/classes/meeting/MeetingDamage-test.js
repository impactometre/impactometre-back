'use strict'

const assert = require('assert')
const CategoryDamage = require('../../../../model/classes/meeting/CategoryDamage')
const MeetingDamage = require('../../../../model/classes/meeting/MeetingDamage')
const transportDatabase = require('../../../../database/meeting/transportationMean')
const hardwareDatabase = require('../../../../database/meeting/hardware')
const softwareDatabase = require('../../../../database/meeting/software')
const {
  meetingCategoryDamage,
  bounds
} = require('../../../../constants/meeting')

describe('MeetingDamage class', () => {
  describe('#computeDamage()', () => {
    // Create the array of JSON objects that enables to create the journey components of the meeting
    const journeyJSON = [
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
    // Create the corresponding journey CategoryDamage object and compute its total damage
    const journeyCategoryDamage = new CategoryDamage({ components: journeyJSON, category: meetingCategoryDamage.JOURNEY })
    journeyCategoryDamage.computeDamage()

    // Create the array of JSON objects that enables to create the software components of the meeting
    const softwareJSON = [{ name: softwareDatabase.SKYPE.name }]
    // Create the corresponding software CategoryDamage object and compute its total damage
    const softwareCategoryDamage = new CategoryDamage({ components: softwareJSON, category: meetingCategoryDamage.SOFTWARE })
    softwareCategoryDamage.computeDamage({ instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 120 })

    // Create the array of JSON objects that enables to create the hardware components of the meeting
    const hardwareJSON = [
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.LAPTOP.name },
      { name: hardwareDatabase.LOGITECH_KIT.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.METAL_STRUCTURE.name }
    ]
    // Create the corresponding software CategoryDamage object and compute its total damage
    const hardwareCategoryDamage = new CategoryDamage({ components: hardwareJSON, category: meetingCategoryDamage.HARDWARE })
    hardwareCategoryDamage.computeDamage({ meetingDuration: 120, bound: bounds.UPPER })

    // Create the MeetingDamage object thnaks to three arrays of JSON object
    const meetingDamage = new MeetingDamage({
      hardware: hardwareJSON,
      software: softwareJSON,
      journey: journeyJSON
    })
    // Compute the total damage linked to the MeetingDamage object
    const totalDamageJSON = {
      [meetingCategoryDamage.HARDWARE]: { meetingDuration: 120, bound: bounds.UPPER },
      [meetingCategoryDamage.SOFTWARE]: { instancesNumber: 5, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration: 120 },
      [meetingCategoryDamage.JOURNEY]: {}
    }
    meetingDamage.computeDamage(totalDamageJSON)
    it('should compute the total damage caused by all the compoments linked to the MeetingDamage object', () => {
      assert.deepStrictEqual(
        meetingDamage.totalDamage,
        hardwareCategoryDamage.totalDamage.add(softwareCategoryDamage.totalDamage).add(journeyCategoryDamage.totalDamage)
      )
    })
  })
})
