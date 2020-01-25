'used strict'

const assert = require('assert')
const normalise = require('../../utils/normalise')

describe('Normalise utilitary function', () => {
  describe('#normalise()', () => {
    const originalArray = [20, 18, 14, 6, 2]
    const normalisedArray = [100, 90, 70, 30, 10]
    it('should normalise the array', () => {
      assert.deepStrictEqual(
        normalise(originalArray),
        normalisedArray
      )
    })
  })
})
