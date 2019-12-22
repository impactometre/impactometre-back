'use strict'

/**
 * Get the closest item array from a given number.
 * Get the greater if given number is exactly between
 * two items of the array.
 * @param {Number} number - The number we want to compare to array values.
 * @param {Array} numbers - The array of numbers.
 */
function getClosest (number, numbers) {
  let exactMatch = false
  let currentClosest = numbers[0]
  let index = 1
  while (!exactMatch && index < numbers.length) {
    const currentItem = numbers[index]
    if (currentItem === number) {
      currentClosest = currentItem
      exactMatch = true
    } else {
      const diffWithCurrentClosest = Math.abs(number - currentClosest)
      const diffWithCurrentItem = Math.abs(number - currentItem)

      /* Get the greater if given number is exactly between
      two items of the array */
      if (diffWithCurrentItem === diffWithCurrentClosest) {
        if (currentItem > currentClosest) {
          currentClosest = currentItem
        }
      } else if (diffWithCurrentItem < diffWithCurrentClosest) {
        currentClosest = currentItem
      }
    }

    index = index + 1
  }

  return currentClosest
}

module.exports = getClosest
