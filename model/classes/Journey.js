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
    this.id = uniqid()
    this.mean = mean
    this.distance = distance
    this.numberOfPeople = numberOfPeople
  }

  // Getters

  /**
   * Getter of the journey id.
   */
  get id () {
    return this.id
  }

  /**
   * Getter of the journey transportation mean.
   */
  get mean () {
    return this.mean
  }

  /**
   * Getter of the journey distance.
   */
  get distance () {
    return this.distance
  }

  /**
   * Getter of the journey number of people.
   */
  get numberOfPeople () {
    return this.numberOfPeople
  }

  // Setters

  /**
   * Setter of the journey transportation mean.
   * @param {TransportationMean} transportationMean - The new journey transportation mean.
   */
  set mean (transportationMean) {
    this.mean = transportationMean
  }

  /**
   * Setter of the journey distance.
   * @param {Float} distance - The new journey distance.
   */
  set distance (distance) {
    this.distance = distance
  }

  /**
   * Setter of the journey number of people.
   * @param {Integer} numberOfPeople - The new journey number of people.
   */
  set numberOfPeople (numberOfPeople) {
    this.numberOfPeople = numberOfPeople
  }
}

module.exports = Journey
