'use strict'

const assert = require('assert')
const Software = require('../../../../model/services/meeting/software')

describe('Software data access', () => {
  describe('#get(name)', () => {
    it('should return the software corresponding to the given name', () => {
      assert.notStrictEqual(
        Software.get('RENAVISIO'),
        {
          french: 'Renavisio',
          fileSize: 18.8,
          downloadSpeed: 1080
        }
      )
    })
  })

  describe('#getDownloadSpeedOf()', () => {
    it('should return the unique available value', () => {
      assert.strictEqual(
        Software.getDownloadSpeedOf('RENAVISIO'),
        1080
      )
    })

    it('should return the unique available value even if number of participants specified', () => {
      assert.strictEqual(
        Software.getDownloadSpeedOf('RENAVISIO', 3),
        1080
      )
    })

    it('should return the matching available (lower bound) value', () => {
      assert.strictEqual(
        Software.getDownloadSpeedOf('SKYPE', 2, 'lower'),
        30
      )
    })

    it('should return the matching available upper bound value when no bound specified', () => {
      assert.strictEqual(
        Software.getDownloadSpeedOf('SKYPE', 2),
        1050
      )
    })

    it('should return the closest greater available (upper bound) value', () => {
      assert.strictEqual(
        Software.getDownloadSpeedOf('SKYPE', 4, 'upper'),
        4000
      )
    })

    it('should return the last available value if participants number is greater than available values', () => {
      assert.strictEqual(
        Software.getDownloadSpeedOf('SKYPE', 8, 'upper'),
        8000
      )
    })
  })
})
