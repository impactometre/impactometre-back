'use strict';

const assert = require('assert');
const CategoryDamage = require('../../../../model/classes/meeting/CategoryDamage');
const Journey = require('../../../../model/classes/meeting/Journey');
const Hardware = require('../../../../model/classes/meeting/Hardware');
const Software = require('../../../../model/classes/meeting/Software');
const {
  meetingCategoryDamage,
  bounds
} = require('../../../../constants/meeting');
const transportDatabase = require('../../../../database/meeting/transportationMean');
const softwareDatabase = require('../../../../database/meeting/software');
const hardwareDatabase = require('../../../../database/meeting/hardware');

describe('CategoryDamage class', () => {
  describe('#computeDamage()', () => {
    // Create the array of JSON objects that enables to create the journey categoryDamage object
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
    ];
    // Create the journey categoryDamage object thanks the array of JSON object and compute
    // the total damage of all the jouneys liked to the category damage object
    const journeyCategoryDamage = new CategoryDamage({ components: journeyJSON, category: meetingCategoryDamage.JOURNEY });
    journeyCategoryDamage.computeDamage();
    // Create each Journey object and compute the damage they cause
    const journey1 = new Journey({
      passenger: 'Passenger 1',
      mean: transportDatabase.CAR_ELECTRIC_ONE_KM.name,
      distance: 120,
      numberOfPeople: 4
    });
    journey1.computeDamage();
    const journey2 = new Journey({
      passenger: 'Passenger 1',
      mean: transportDatabase.BUS_LARGE_DISTANCE_ONE_PERSON_KM.name,
      distance: 40,
      numberOfPeople: 1
    });
    journey2.computeDamage();
    const journey3 = new Journey({
      passenger: 'Passenger 2',
      mean: transportDatabase.CAR_ELECTRIC_ONE_KM.name,
      distance: 120,
      numberOfPeople: 4
    });
    journey3.computeDamage();
    const journey4 = new Journey({
      passenger: 'Passenger 2',
      mean: transportDatabase.TRAIN_REGIONAL_ONE_PERSON_KM.name,
      distance: 300,
      numberOfPeople: 1
    });
    journey4.computeDamage();
    const journey5 = new Journey({
      passenger: 'Passenger 2',
      mean: transportDatabase.BIKE_ONE_PERSON_ONE_KM.name,
      distance: 10,
      numberOfPeople: 1
    });
    journey5.computeDamage();
    const totalDamage = journey1.damage.add(journey2.damage).add(journey3.damage).add(journey4.damage).add(journey5.damage);
    it('should compute the total damage of a journey categoryDamage object', () => {
      assert.deepStrictEqual(
        journeyCategoryDamage.totalDamage,
        totalDamage
      );
    });

    // Create the array of JSON objects that enables to create a software categoryDamage object
    const softwareJSON = [{ name: softwareDatabase.SKYPE.name }];
    // Create the software categoryDamage object thanks the array of JSON object and compute
    // the total damage of all the software liked to the category damage object
    const softwareCategoryDamage = new CategoryDamage({ components: softwareJSON, category: meetingCategoryDamage.SOFTWARE });
    softwareCategoryDamage.computeDamage({
      instancesNumber: 5,
      bandwithBound: bounds.UPPER,
      networkBound: bounds.UPPER,
      meetingDuration: 120
    });
    // Create each Software object and compute the damage they cause
    const skype = new Software({ name: softwareDatabase.SKYPE.name });
    skype.computeDamage({
      instancesNumber: 5,
      bandwithBound: bounds.UPPER,
      networkBound: bounds.UPPER,
      meetingDuration: 120
    });
    it('should compute the total damage of a software categoryDamage object', () => {
      assert.deepStrictEqual(
        softwareCategoryDamage.totalDamage,
        skype.damage
      );
    });

    // Create the array of JSON objects that enables to create a software categoryDamage object
    const hardwareJSON = [
      { name: hardwareDatabase.LAPTOP.name },
      { name: hardwareDatabase.LOGITECH_KIT.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.METAL_STRUCTURE.name }
    ];
    const hardwareCategoryDamage = new CategoryDamage({ components: hardwareJSON, category: meetingCategoryDamage.HARDWARE });
    hardwareCategoryDamage.computeDamage({ meetingDuration: 120, bound: bounds.UPPER });
    // Create the hardware categoryDamage object thanks the array of JSON object and compute
    // the total damage of all the hardware liked to the category damage object
    const laptop = new Hardware({ name: hardwareDatabase.LAPTOP.name });
    laptop.computeDamage({ meetingDuration: 120, bound: bounds.UPPER });
    const logitechKit = new Hardware({ name: hardwareDatabase.LOGITECH_KIT.name });
    logitechKit.computeDamage({ meetingDuration: 120, bound: bounds.UPPER });
    const TV1 = new Hardware({ name: hardwareDatabase.TV.name });
    TV1.computeDamage({ meetingDuration: 120, bound: bounds.UPPER });
    const TV2 = new Hardware({ name: hardwareDatabase.TV.name });
    TV2.computeDamage({ meetingDuration: 120, bound: bounds.UPPER });
    const metalStructure = new Hardware({ name: hardwareDatabase.METAL_STRUCTURE.name });
    metalStructure.computeDamage({ meetingDuration: 120, bound: bounds.UPPER });
    it('should compute the total damage of a hardware categoryDamage object', () => {
      assert.deepStrictEqual(
        hardwareCategoryDamage.totalDamage,
        laptop.damage.add(logitechKit.damage).add(TV1.damage).add(TV2.damage).add(metalStructure.damage)
      );
    });
  });
});
