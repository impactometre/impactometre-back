'use strict'

const assert = require('assert')
const CategoryDamage = require('../../../../model/classes/meeting/CategoryDamage')
const Journey = require('../../../../model/classes/meeting/Journey')
const TransportationMean = require('../../../../model/classes/meeting/TransportationMean')
const constants = require('../../../../constants/meeting')
const transportDatabase = require('../../../../model/database/meeting/transportationMean')

describe('CategoryDamage class', () => {
  describe('#constructor()', () => {
    const electricCar = new TransportationMean(transportDatabase.CAR_ELECTRIC_ONE_KM)
    const journeyElectricCar3People = new Journey('Passenger 1', electricCar, 100, 3)
    const journeyElectricCar3PeopleDamage = journeyElectricCar3People.computeDamage()
    const journeyElectricCar5People = new Journey('Passenger 1', electricCar, 100, 5)
    const journeyElectricCar5PeopleDamage = journeyElectricCar5People.computeDamage()
    const journeyElectricCar2People = new Journey('Passenger 1', electricCar, 100, 2)
    const journeyElectricCar2PeopleDamage = journeyElectricCar2People.computeDamage()
    const heatCar = new TransportationMean(transportDatabase.CAR_HEAT_ENGINE_ONE_KM)
    const journeyHeatCar2People = new Journey('Passenger 1', heatCar, 100, 2)
    const journeyHeatCar2PeopleDamage = journeyHeatCar2People.computeDamage()
    const damage = [journeyElectricCar3PeopleDamage, journeyElectricCar2PeopleDamage, journeyElectricCar5PeopleDamage, journeyHeatCar2PeopleDamage]
    const category = constants.meetingCategoryDamage.TRANSPORT
    const transportDamage = new CategoryDamage({ damage, category })
    const computedTotalDamage = journeyElectricCar2PeopleDamage.add(
      journeyElectricCar3PeopleDamage).add(
      journeyElectricCar5PeopleDamage).add(
      journeyHeatCar2PeopleDamage)
    it('The total damage of a CategoryDamage object should be the sum of all damages that it contains', () => {
      assert.deepStrictEqual(
        transportDamage.totalDamage,
        computedTotalDamage
      )
    })
  })
})
