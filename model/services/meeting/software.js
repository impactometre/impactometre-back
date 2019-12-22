'use strict'
const softwareDatabase = require('../../database/meeting/software')
const getClosest = require('../../../utils/get-closest')

function get (name) {
  return softwareDatabase[name]
}

/**
 * Return the given software download speed.
 * @param {String} softwareName - The software name.
 * @param {Number} participantsNumber - The participants number.
 * @param {String} bound - The bound ('upper' or 'lower').
 */
function getDownloadSpeedOf (softwareName, participantsNumber, bound) {
  const software = get(softwareName)
  const rawDownloadSpeed = software.downloadSpeed

  /* If we don't have data specific to a number of
  participants, we return the unique value we got */
  if (typeof rawDownloadSpeed === 'number') {
    return rawDownloadSpeed
  }

  /* Among the available download speed values, we get the
  one which participants number is the closest from the
  given participants number.
  */
  const availableNumbers = Object.keys(rawDownloadSpeed)
  const closestAvailableNumber = getClosest(
    participantsNumber,
    availableNumbers
  )

  const closestDownloadSpeed = software.downloadSpeed[closestAvailableNumber]

  /* If we don't have bound specific data,
  we return the unique value we got */
  if (typeof closestDownloadSpeed === 'number') {
    return closestDownloadSpeed
  }

  /* If desired bound value was given, we return
  the corresponding value. Else we return the
  upper value.
  */
  const boundSpecificDownloadSpeed = (bound != null)
    ? closestDownloadSpeed[bound]
    : closestDownloadSpeed.upper

  return boundSpecificDownloadSpeed
}

module.exports = { get, getDownloadSpeedOf }
