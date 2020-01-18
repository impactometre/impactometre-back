'use strict'

const Damage = require('../shared/Damage')
const Component = require('../shared/Component')

/**
 * A journey has a mean of transportation,
 * a distance and a number of people.
 */
class Journey extends Component {
  /**
   * The Journey class constructor.
   * @param {String} passenger - The name of the passenger.
   * @param {TransportationMean} mean - The mean of transportation.
   * @param {Float} distance - The distance of the journey.
   * @param {Integer} numberOfPeople - The number of people of the journey.
   */
  constructor ({ passenger, mean, distance, numberOfPeople }) {
    // A Journey object doesn't have a name attribute and a french attribute, because there is no Journey
    // in database but only transportation means
    super({ name: '', french: '' })
    this._passenger = passenger
    this._mean = mean
    this._distance = distance
    this._numberOfPeople = numberOfPeople
    this._damage = this.computeDamage()
  }

  // Getters

  /**
   * Getter of the journey passenger name.
   */
  get passenger () {
    return this._passenger
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
   * Setter of the journey distance.
   * @param {Float} distance - The new journey distance.
   */
  set passenger (passenger) {
    this._passenger = passenger
  }

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
   * @returns {Damage} The damage caused by journey, for each damage sphere.
   */
  computeEmbodiedDamage () {
    // Get the transportation mean damage for one personKm or one kilometer
    const transportationMeanDamage = new Damage(this.mean.embodied)

    // Initialize the returned damage
    const embodiedDamage = new Damage()

    // Compute damage for each sphere (calculation mode is by personKm or by kilometer)
    if (this.mean.isComputedByPersonKm) {
      // Compute the personKilometers amount
      const personKmAmount = this.distance * this.numberOfPeople

      embodiedDamage.mutate(category => {
        transportationMeanDamage[category] *= personKmAmount
      })
    } else {
      embodiedDamage.mutate(category => {
        embodiedDamage[category] = transportationMeanDamage[category] * this.distance
      })
    }

    // Return the journey embodied damage
    return embodiedDamage
  }

  /**
   * Compute the total damage of the journey.
   * There is a method with the same name for Software class and Hardware class.
   * @returns {Damage} The total damage caused by the journey.
   */
  computeDamage () {
    return this.computeEmbodiedDamage()
  }
}

module.exports = Journey
