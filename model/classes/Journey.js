'use strict'

/**
 * A journey has a mean of transportation,
 * a distance and a number of people.
 */
export default class Journey {
  /**
   * The Journey class constructor.
   * @param {transportationMean} mean The mean of transportation.
   * @param {Float} distance The distance of the journey.
   * @param {Integer} numberOfPeople The number of people of the journey.
   */
  constructor (mean, distance, numberOfPeople) {
    this.mean = mean
    this.distance = distance
    this.numberOfPeople = numberOfPeople
  }
}

module.exports = Journey
