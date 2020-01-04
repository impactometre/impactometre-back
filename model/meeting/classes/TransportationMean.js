'use strict'
/**
 * TransportationMan class.
 * An instance of this class represents a transportation mean,
 * with its french name and its embodied damage.
 */
class TransportationMean {
  /**
   * Construct an TransportationMean object form the JSON database.
   * @param transportationMean - A transportation mean from the JSON database.
   * @see transport.js The JSON file.
   */
  constructor (transportationMean) {
    this._french = transportationMean.french
    this._embodied = transportationMean.embodied
    this._isComputedByPersonKm = transportationMean.isComputedByPersonKm
  }

  // Getters

  /**
   * Getter of the transportation mean french name.
   */
  get french () {
    return this._french
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
   * Setter of the transportation mean french name.
   */
  set french (french) {
    this._french = french
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
