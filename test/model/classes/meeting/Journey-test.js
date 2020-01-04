'use strict'

const assert = require('assert')
const transportDatabase = require('../../../../model/database/meeting/transport')
const TransportationMean = require('../../../../model/classes/TransportationMean')
const Journey = require('../../../../model/classes/Journey')
const ComponentDamage = require('../../../../model/classes/ComponentDamage')

describe('Journey classes', () => {
  describe('#computeEmbodiedDamage ()', () => {
    const electricCar = new TransportationMean(transportDatabase.CAR_ELECTRIC_ONE_KM)
    const journeyElectricCar3People = new Journey(electricCar, 100, 3)
    const embodiedDamage = new ComponentDamage({
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

    const journeyElectricCar5People = new Journey(electricCar, 100, 5)
    it('two journeys with the same kind of car and the same distance should cause the same damage (i.e. the number of people desn\'t matter)', () => {
      assert.deepStrictEqual(
        journeyElectricCar3People.computeEmbodiedDamage(),
        journeyElectricCar5People.computeEmbodiedDamage()
      )
    })

    const heatCar = new TransportationMean(transportDatabase.CAR_HEAT_ENGINE_ONE_KM)
    const journeyHeatCar3People = new Journey(heatCar, 100, 3)
    it('a journey by car should be computed by kilometer (not by personKilometer)', () => {
      assert.strictEqual(
        journeyElectricCar3People.mean.isComputedByPersonKm && journeyHeatCar3People.mean.isComputedByPersonKm,
        false
      )
    })

    const intercontinentalPlane = new TransportationMean(transportDatabase.PLANE_INTERCONTINENTAL_ONE_PERSON_KM)
    const intercontinentalPlaneJourney2People = new Journey(intercontinentalPlane, 1000, 2)
    const intercontinentalPlaneJourney4People = new Journey(intercontinentalPlane, 1000, 4)
    const embodiedDamageIntercontinentalPlane = intercontinentalPlaneJourney2People.computeEmbodiedDamage()
    const humanHealth = embodiedDamageIntercontinentalPlane.humanHealth
    const ecosystemQuality = embodiedDamageIntercontinentalPlane.ecosystemQuality
    const climateChange = embodiedDamageIntercontinentalPlane.climateChange
    const resources = embodiedDamageIntercontinentalPlane.resources
    const embodiedDamageTwice = new ComponentDamage({
      humanHealth,
      ecosystemQuality,
      climateChange,
      resources
    })

    embodiedDamageTwice.mutate(category => { return embodiedDamageTwice[category] * 2 })
    it('a 4 people journey by plane should cause twice the damage of a 2 people journey by plane', () => {
      assert.deepStrictEqual(
        intercontinentalPlaneJourney4People.computeEmbodiedDamage(),
        embodiedDamageTwice
      )
    })
  })
  describe('#computeDamage ()', () => {
    const highSpeedTrain = new TransportationMean(transportDatabase.TRAIN_HIGH_SPEED_ONE_PERSON_KM)
    const distance = 300
    const numberOfPeople = 4
    const highSpeedTrainJourney = new Journey(highSpeedTrain, distance, numberOfPeople)
    it('the total damage caused by a journey should by equal to its embodied damage', () => {
      assert.deepStrictEqual(
        highSpeedTrainJourney.computeDamage(),
        highSpeedTrainJourney.computeEmbodiedDamage()

      )
    })
  })
})
