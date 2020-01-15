'use strict'

const Damage = require('../shared/Damage')

class CategoryDamage {
  /**
   * Create a damage synthesis for all meeting components from the same category (hardware, software or transport).
   * It's composed of a total damage that is the sum of each component damage
   * and of a array that contains all the component damages.
   * @param {Damage[]} damage - An array that contains all damages caused by a specific category of components of a meeting.
   * @param {String} category - The category of the components wich caused the damage.
   */
  constructor ({ damage, category }) {
    this._damage = damage
    this._category = category

    // The total damage is the sum of all damages
    let totalDamage = new Damage()
    damage.forEach(d => {
      totalDamage = totalDamage.add(d)
    })

    this._totalDamage = totalDamage
  }

  // Getters

  /**
   * Getter of the total category damage.
   */
  get totalDamage () {
    return this._totalDamage
  }

  /**
   * Getter of the array that contains all the damages caused by a specific category of components of a meeting.
   */
  get damage () {
    return this._damage
  }

  /**
   * Getter of The category of the components wich caused the damage.
   */
  get category () {
    return this._category
  }

  // Setters

  /**
   * Setter of the total category damage.
   */
  set totalDamage (totalDamage) {
    this._totalDamage = totalDamage
  }

  /**
   * Setter of the array that contains all the damages caused by a specific category of components of a meeting.
   */
  set damage (damage) {
    this._damage = damage
  }

  /**
   * Setter of The category of the components wich caused the damage.
   */
  set category (category) {
    this._category = category
  }

  // Other methods
}

module.exports = CategoryDamage
