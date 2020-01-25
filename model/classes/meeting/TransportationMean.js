'use strict'

const transportationMeanDatabase = require('../../database/meeting/transportationMean')

/**
 * TransportationMan class.
 * An instance of this class represents a transportation mean,
 * with its french name and its embodied damage.
 */
class TransportationMean {
  /**
   * Construct an TransportationMean object thanks to the transportation mean database.
   * @param name - The key of a transportation mean database entry, also the transportation mean name.
   */
  constructor ({ name }) {
    // Get the corresponding JSON object from the transportation means database
    const json = transportationMeanDatabase[name]

    // Initialize TransportationMean object thanks to the JSON object
    this._name = json.name
    this._french = json.french
    this._subCategory = json.subCategory
    this._embodied = json.embodied
    this._isComputedByPersonKm = json.isComputedByPersonKm
  }

  // Getters

  /**
   * Getter of the transportation name.
   */
  get name () {
    return this._name
  }

  /**
   * Getter of the transportation mean french name.
   */
  get french () {
    return this._french
  }

  /**
   * Getter of the transporation mean sub-category (i.e. car, plane, train, bus or bike)
   */
  get subCategory () {
    return this._subCategory
  }

  /**
   * Getter of the transportation mean embodied damage.
   */
  get embodied () {
    return this._embodied
  }

  /**
   * Getter to know if the damageof the transportation mean is
   * calculate by personKm (true) or by kilometer (false).
   */
  get isComputedByPersonKm () {
    return this._isComputedByPersonKm
  }

  // Setters

  /**
   * Setter of the transportation mean name.
   */
  set name (name) {
    this._name = name
  }

  /**
   * Setter of the transportation mean french name.
   */
  set french (french) {
    this._french = french
  }

  /**
   * Setter of the transporation mean sub-category (i.e. car, plane, train, bus or bike)
   */
  set subCategory (subCategory) {
    this._subCategory = subCategory
  }

  /**
   * Setter of the transportation mean embodied damage.
   */
  set embodied (embodied) {
    this._embodied = embodied
  }

  /**
   * Setter of the transportation mean damage calculaion mode,
   * in personKm (true) or in kilometer (false).
   */
  set isComputedByPersonKm (isComputedByPersonKm) {
    this._isComputedByPersonKm = isComputedByPersonKm
  }
}

module.exports = TransportationMean
