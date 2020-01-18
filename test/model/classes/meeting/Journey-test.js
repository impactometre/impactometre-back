'use strict'

const assert = require('assert')
const transportDatabase = require('../../../../model/database/meeting/transportationMean')
const TransportationMean = require('../../../../model/classes/meeting/TransportationMean')
const Journey = require('../../../../model/classes/meeting/Journey')
const Damage = require('../../../../model/classes/shared/Damage')

describe('Journey class', () => {
  describe('#computeEmbodiedDamage ()', () => {
    const electricCar = new TransportationMean({ name: transportDatabase.CAR_ELECTRIC_ONE_KM.name })
    const journeyElectricCar3People = new Journey({
      passenger: 'Passenger 1',
      mean: electricCar,
      distance: 100,
      numberOfPeople: 3
    })
    const embodiedDamage = new Damage({
      humanHealth: electricCar.embodied.humanHealth * 100,
      ecosystemQuality: electricCar.embodied.ecosystemQuality * 100,
      climateChange: electricCar.embodied.climateChange * 100,
      resources: electricCar.embodied.resources * 100
    })

    it('should return the damage caused by 3 people in a eletric car for one kilometer ', () => {
      assert.deepStrictEqual(
        journeyElectricCar3People.computeEmbodiedDamage(),
        embodiedDamage
      )
    })

    const journeyElectricCar5People = new Journey({
      passenger: 'Passenger 2',
      mean: electricCar,
      distance: 100,
      numberOfPeople: 5
    })
    it('two journeys with the same kind of car and the same distance should cause the same damage (i.e. the number of people desn\'t matter)', () => {
      assert.deepStrictEqual(
        journeyElectricCar3People.computeEmbodiedDamage(),
        journeyElectricCar5People.computeEmbodiedDamage()
      )
    })

    const heatCar = new TransportationMean({ name: transportDatabase.CAR_HEAT_ENGINE_ONE_KM.name })
    const journeyHeatCar3People = new Journey({
      passenger: 'Passenger 2',
      mean: heatCar,
      distance: 100,
      numberOfPeople: 3
    })
    it('a journey by car should be computed by kilometer (not by personKilometer)', () => {
      assert.strictEqual(
        journeyElectricCar3People.mean.isComputedByPersonKm && journeyHeatCar3People.mean.isComputedByPersonKm,
        false
      )
    })

    const intercontinentalPlane = new TransportationMean({ name: transportDatabase.PLANE_INTERCONTINENTAL_ONE_PERSON_KM.name })
    const intercontinentalPlaneJourney2People = new Journey({
      passenger: 'Passenger 1',
      mean: intercontinentalPlane,
      distance: 1000,
      numberOfPeople: 2
    })
    const intercontinentalPlaneJourney4People = new Journey({
      passenger: 'Passenger 2',
      mean: intercontinentalPlane,
      distance: 1000,
      numberOfPeople: 4
    })
    const embodiedDamageIntercontinentalPlane = intercontinentalPlaneJourney2People.computeEmbodiedDamage()
    const humanHealth = embodiedDamageIntercontinentalPlane.humanHealth
    const ecosystemQuality = embodiedDamageIntercontinentalPlane.ecosystemQuality
    const climateChange = embodiedDamageIntercontinentalPlane.climateChange
    const resources = embodiedDamageIntercontinentalPlane.resources
    const embodiedDamageTwice = new Damage({
      humanHealth,
      ecosystemQuality,
      climateChange,
      resources
    })

    embodiedDamageTwice.mutate(category => { embodiedDamageTwice[category] *= 2 })
    it('a 4 people journey by plane should cause twice the damage of a 2 people journey by plane', () => {
      assert.deepStrictEqual(
        intercontinentalPlaneJourney4People.computeEmbodiedDamage(),
        embodiedDamageTwice
      )
    })
  })
  describe('#computeDamage ()', () => {
    const highSpeedTrain = new TransportationMean({ name: transportDatabase.TRAIN_HIGH_SPEED_ONE_PERSON_KM.name })
    const distance = 300
    const numberOfPeople = 4
    const highSpeedTrainJourney = new Journey({
      passenger: 'Passenger 2',
      mean: highSpeedTrain,
      distance,
      numberOfPeople
    })
    it('the total damage caused by a journey should by equal to its embodied damage', () => {
      assert.deepStrictEqual(
        highSpeedTrainJourney.computeDamage(),
        highSpeedTrainJourney.computeEmbodiedDamage()

      )
    })
  })
})
