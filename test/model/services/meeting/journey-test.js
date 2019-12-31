'use strict'

const assert = require('assert')
const transportDatabase = require('../../../../model/database/meeting/transport')
const TransportationMean = require('../../../../model/classes/TransportationMean')
const Journey = require('../../../../model/classes/Journey')
const ComponentDamage = require('../../../../model/classes/ComponentDamage')

describe('Journey services', () => {
  describe('#computeEmbodiedDamage ()', () => {
    const electricCar = new TransportationMean(transportDatabase.CAR_ELECTRIC_ONE_KM)
    const journeyElectricCar3People = new Journey(electricCar, 100, 3)
    const embodiedDamage = new ComponentDamage(
      electricCar.embodied.humanHealth * 100,
      electricCar.embodied.ecosystemQuality * 100,
      electricCar.embodied.climateChange * 100,
      electricCar.embodied.resources * 100
    )
    it('should return the damage caused by 3 people in a eletric car for one kilomter ', () => {
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
    it('a jounrey by car should be calcuted by kilometer (not by personKilometer)', () => {
      assert.strictEqual(
        journeyElectricCar3People.mean.isPersonKm && journeyHeatCar3People.mean.isPersonKm,
        false
      )
    })
    const intercontinentalPlane = new TransportationMean(transportDatabase.PLANE_INTERCONTINENTAL_ONE_PERSON_KM)
    const intercontinentalPlaneJourney2People = new Journey(intercontinentalPlane, 1000, 2)
    const intercontinentalPlaneJourney4People = new Journey(intercontinentalPlane, 1000, 4)
    const embodiedDamageIntercontinentalPlane = intercontinentalPlaneJourney2People.computeEmbodiedDamage()
    const humanHealthDamage = embodiedDamageIntercontinentalPlane.humanHealth
    const ecosystemQualityDamage = embodiedDamageIntercontinentalPlane.ecosystemQuality
    const climateChangeDamage = embodiedDamageIntercontinentalPlane.climateChange
    const resourcesDamage = embodiedDamageIntercontinentalPlane.resources
    const embodiedDamageTwice = new ComponentDamage(
      humanHealthDamage * 2,
      ecosystemQualityDamage * 2,
      climateChangeDamage * 2,
      resourcesDamage * 2
    )
    it('a 4 people journey by plane should cause twice the damage of a 2 people journey by plane', () => {
      assert.deepStrictEqual(
        intercontinentalPlaneJourney4People.computeEmbodiedDamage(),
        embodiedDamageTwice
      )
    })
  })
})
