'use strict'

var uniqid = require('uniqid')

/**
 * A journey has a mean of transportation,
 * a distance and a number of people.
 */
export default class Journey {
  /**
   * The Journey class constructor.
   * @param {TransportationMean} mean The mean of transportation.
   * @param {Float} distance The distance of the journey.
   * @param {Integer} numberOfPeople The number of people of the journey.
   */
  constructor (mean, distance, numberOfPeople) {
    this._id = uniqid()
    this._mean = mean
    this._distance = distance
    this._numberOfPeople = numberOfPeople
  }

  // Getters

  /**
   * Getter of the journey id.
   */
  get id () {
    return this._id
  }

  /**
   * Getter of the journey transportation mean.
   */
  get mean () {
    return this._mean
  }

  /**
   * Getter of the journey distance.
   */
  get distance () {
    return this._distance
  }

  /**
   * Getter of the journey number of people.
   */
  get numberOfPeople () {
    return this._numberOfPeople
  }

  // Setters

  /**
   * Setter of the journey transportation mean.
   * @param {TransportationMean} transportationMean - The new journey transportation mean.
   */
  set mean (transportationMean) {
    this._mean = transportationMean
  }

  /**
   * Setter of the journey distance.
   * @param {Float} distance - The new journey distance.
   */
  set distance (distance) {
    this._distance = distance
  }

  /**
   * Setter of the journey number of people.
   * @param {Integer} numberOfPeople - The new journey number of people.
   */
  set numberOfPeople (numberOfPeople) {
    this._numberOfPeople = numberOfPeople
  }

  // Other methods

  /**
   * Computes the damage caused by a journey.
   * @returns {ComponentDamage} The damage caused by journey, for each damage sphere.
   */
  computeEmbodiedDamage () {
    // Get the transportation mean damage for one personKm or one kilometer
    const transportationMeanDamage = new ComponentDamage(this.mean.embodied)

    // Initialize the returned damage
    const embodiedDamage = new ComponentDamage()

    // Compute damage for each sphere (calculation mode is by personKm or by kilometer)
    if (this.mean.isComputedByPersonKm) {
      // Compute the personKilometers amount
      const personKmAmount = this.distance * this.numberOfPeople

      embodiedDamage.mutate(category => {
        return transportationMeanDamage[category] * personKmAmount
      })
    } else {
      embodiedDamage.mutate(category => {
        return transportationMeanDamage[category] * this.distance
      })
    }

    // Return the journey embodied damage
    return embodiedDamage
  }

  /**
   * Compute the total damage of the journey.
   * There is a method with the same name for Software class and Hardware class.
   * @returns {CompenentDamage} The total damage caused by the journey.
   */
  computeDamage () {
    return this.computeEmbodiedDamage()
  }
}

module.exports = Journey
