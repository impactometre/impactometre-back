'use strict'

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

  return normalisedNumber
}

module.exports = normalise
