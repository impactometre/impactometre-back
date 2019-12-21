'use strict'

export default class GlobalDamage {
  /**
   * Create a global damage synthesis.
   * Each value is between 1 and 100.
   * @param {DistributedDamage} onHumanHealth - The damage value on Human Health
   * @param {DistributedDamage} onEcosystemQuality - The damage value on Ecosystem Quality.
   * @param {DistributedDamage} onResources - The damage value on Resources.
   * @param {DistributedDamage} onEnvironment - The damage value on Environment.
   */
  constructor (onHumanHealth, onEcosystemQuality, onResources, onEnvironment) {
    this.onHumanHealth = onHumanHealth
    this.onEcosystemQuality = onEcosystemQuality
    this.onResources = onResources
    this.onEnvironment = onEnvironment
  }
}
