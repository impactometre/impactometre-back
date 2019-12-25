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
 * @param {String} bound - The bound ('minimum' or 'ideal').
 */
function getInboundBandwith (softwareName, participantsNumber, bound) {
  const software = get(softwareName)
  const rawInbound = software.bandwith.inbound

  /* If we don't have data specific to a number of
  participants, we return the unique value we got */
  if (typeof rawInbound === 'number') {
    return rawInbound
  }

  /* Among the available download speed values, we get the
  one which participants number is the closest from the
  given participants number.
  */
  const availableNumbers = Object.keys(rawInbound)
  const closestAvailableNumber = getClosest(
    participantsNumber,
    availableNumbers
  )

  const closestValue = software.bandwith.inbound[closestAvailableNumber]

  /* If we don't have bound specific data,
  we return the unique value we got */
  if (typeof closestValue === 'number') {
    return closestValue
  }

  /* If desired bound value was given, we return
  the corresponding value. Else we return the
  ideal value.
  */
  const boundSpecificValue = (bound != null)
    ? closestValue[bound]
    : closestValue.ideal

  return boundSpecificValue
}

module.exports = { get, getInboundBandwith }
