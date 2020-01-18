'use strict'

const uniqid = require('uniqid')

/**
 * Component abstract class.
 */
class Component {
  /**
   * Create a component of a scenario.
   * @param {String} name - The database key that enables to create the component.
   * @param {String} french - The component french name.
   */
  constructor ({ name, french }) {
    if (new.target === Component) throw TypeError('Cannot create instance of Component because abstract class')
    this._id = uniqid()
    this._name = name
    this._french = french
  }

  // Getters

  /**
   * Getter of the component id.
   */
  get id () {
    return this._id
  }

  /**
   * Getter of the component name.
   */
  get name () {
    return this._name
  }

  /**
   * Getter of the component french name.
   */
  get french () {
    return this._french
  }

  /**
   * Getter of the component damage.
   */
  get damage () {
    return this._damage
  }

  // Setters

  /**
   * Setter of the component id.
   */
  set id (id) {
    this._id = id
  }

  /**
   * Setter of the component name.
   */
  set name (name) {
    this._name = name
  }

  /**
   * Setter of the component french name.
   */
  set french (french) {
    this._french = french
  }

  /**
   * Setter of the component damage.
   */
  set damage (damage) {
    this._damage = damage
  }

  // Other methods

  /**
   * Compute the component damage.
   */
  computeDamage () {
    throw new Error('You must implement this function')
  }
}

module.exports = Component
