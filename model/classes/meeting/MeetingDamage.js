'use strict'

class MeetingDamage {
  /**
   * Create a damage synthesis of a meeting.
   * It's composed of a Damage component that represents the total damage caused by the meeting
   * and of three CategoryDamage objects that repesent the damages caused by the all
   * the meeting components gathered by category (hardware, software, transport).
   * @param {CategoryDamage} hardwareDamage - The damage caused by hardware components.
   * @param {CategoryDamage} softwareDamage - The damage caused by software components.
   * @param {CategoryDamage} transportDamage - The damage caused by transport components.
   * @see Damage.js
   */
  constructor ({ hardwareDamage, softwareDamage, transportDamage }) {
    this._hardwareDamage = hardwareDamage
    this._softwareDamage = softwareDamage
    this._transportDamage = transportDamage

    // The total damage of a meeting is the sum of the total damage for each category (it's a Damage object)
    this._totalDamage = this._hardwareDamage.totalDamage
      .add(this._softwareDamage.totalDamage)
      .add(this._transportDamage.totalDamage)
  }

  // Getters

  /**
   * Getter of the damage caused by hardware components.
   */
  get hardwareDamage () {
    return this._hardwareDamage
  }

  /**
   * Getter of the damage caused by software components.
   */
  get softwareDamage () {
    return this._softwareDamage
  }

  /**
   * Getter of the damage caused by transport components.
   */
  get transportDamage () {
    return this._transportDamage
  }

  /**
   * Getter of the total damage caused by the meeting.
   */
  get totalDamage () {
    return this._totalDamage
  }

  // Setters

  /**
   * Setter of the damage caused by hardware components.
   */
  set hardwareDamage (hardwareDamage) {
    this._hardwareDamage = hardwareDamage
  }

  /**
   * Setter of the damage caused by software components.
   */
  set softwareDamage (softwareDamage) {
    this._softwareDamage = softwareDamage
  }

  /**
   * Setter of the damage caused by transport components.
   */
  set transportDamage (transportDamage) {
    this._transportDamage = transportDamage
  }

  /**
   * Setter of the total damage caused by the meeting.
   */
  set totalDamage (totalDamage) {
    this._totalDamage = totalDamage
  }

  // Other methods
}

module.exports = MeetingDamage
