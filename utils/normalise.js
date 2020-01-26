'use strict'

const {
  damageEndpoints
} = require('../constants/meeting')

/**
 * Normalise the array
 * The biggest number is turned into 100, the other numbers are like percentages of the first one
 * example: [20, 18, 14, 6, 2] => [100, 90, 70, 30, 10].
 * The function is used to plot normalised damages.
 * @param {Integer[]} numbers - Array of numbers to normalise.
 */
function normalise (numbers) {
  // Sort the array, the biggest number is first
  numbers.sort((a, b) => b - a)
  const max = numbers[0]

  // Normalise the array
  const normalisedNumbers = numbers.map(number => (number / max) * 100)

  return normalisedNumbers
}

/**
 * Normalised the damages values of several meeting scenarios.
 * The biggest number is turned into 100, the other numbers are like percentages of the first one
 * example:
 * [
 * {HUMAN_HEALTH, meetingScenario1, 20},
 *  {ECOSYSTEM_QUALITY, meetingScenario1, 18},
 *  {CLIMATE_CHANGE, meetingScenario1, 14},
 *   {RESOURCES, meetingScenario1, 6},
 *   {HUMAN_HEALTH, meetingScenario2, 2}
 * ] => [
 *   {HUMAN_HEALTH, meetingScenario1, 100},
 *   {ECOSYSTEM_QUALITY, meetingScenario1, 90},
 *   {CLIMATE_CHANGE, meetingScenario1, 70},
 *   {RESOURCES, meetingScenario1, 30},
 *   {HUMAN_HEALTH, meetingScenario2, 10}
 * ]
 * The function is used to plot normalised damages.
 * @param {Object} meetingScenarios - Iterable object thats contains meetingScenarios we want to normalise the damage values
 * @returns An array that contains JSON objects (like {ECOSYSTEM_QUALITY, meetingScenario1, 90})
 * normaised by their damage values and ordered.
 */
function normaliseDamages (meetingScenarios) {
  let damages = []

  // For each meeting scenario, get the values for each damage end point
  // (human health, ecosysteme quality, climate change and resources) of its total damage
  for (const meetingScenario of meetingScenarios) {
    damages = damages.concat(
      [{
        damageEndpoint: damageEndpoints.HUMAN_HEALTH,
        meetingScenario: meetingScenario.id,
        value: meetingScenario.damage.totalDamage.humanHealth
      }],
      [{
        damageEndpoint: damageEndpoints.ECOSYSTEM_QUALITY,
        meetingScenario: meetingScenario.id,
        value: meetingScenario.damage.totalDamage.ecosystemQuality
      }],
      [{
        damageEndpoint: damageEndpoints.CLIMATE_CHANGE,
        meetingScenario: meetingScenario.id,
        value: meetingScenario.damage.totalDamage.climateChange
      }],
      [{
        damageEndpoint: damageEndpoints.RESOURCES,
        meetingScenario: meetingScenario.id,
        value: meetingScenario.damage.totalDamage.resources
      }]
    )
  }

  // Sort the damage values array and get the maximum value
  damages.sort((a, b) => b.value - a.value)
  const max = damages[0].value

  /* Normalised the damage values
  The biggest number is turned into 100, the other numbers are like percentages of the first one
  example:
  [
    {HUMAN_HEALTH, meetingScenario1, 20},
    {ECOSYSTEM_QUALITY, meetingScenario1, 18},
    {CLIMATE_CHANGE, meetingScenario1, 14},
    {RESOURCES, meetingScenario1, 6},
    {HUMAN_HEALTH, meetingScenario2, 2}
  ] => [
    {HUMAN_HEALTH, meetingScenario1, 100},
    {ECOSYSTEM_QUALITY, meetingScenario1, 90},
    {CLIMATE_CHANGE, meetingScenario1, 70},
    {RESOURCES, meetingScenario1, 30},
    {HUMAN_HEALTH, meetingScenario2, 10}
  ]
  */
  const normalisedDamages = damages.map(function (damage) {
    const normalisedDamage = {
      damageEndpoint: damage.damageEndpoint,
      meetingScenario: damage.meetingScenario,
      value: (damage.value / max) * 100
    }
    return normalisedDamage
  })

  return normalisedDamages
}

module.exports = { normalise, normaliseDamages }
