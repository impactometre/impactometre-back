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
          bandwith: {
            inbound: 1080
          }
        }
      )
    })
  })

  describe('#getInboundBandwith()', () => {
    it('should return the unique available value', () => {
      assert.strictEqual(
        Software.getInboundBandwith('RENAVISIO'),
        1080
      )
    })

    it('should return the unique available value even if number of participants specified', () => {
      assert.strictEqual(
        Software.getInboundBandwith('RENAVISIO', 3),
        1080
      )
    })

    it('should return the matching available (minimum bound) value', () => {
      assert.strictEqual(
        Software.getInboundBandwith('SKYPE', 2, 'minimum'),
        30
      )
    })

    it('should return the matching available ideal bound value when no bound specified', () => {
      assert.strictEqual(
        Software.getInboundBandwith('SKYPE', 2),
        1050
      )
    })

    it('should return the closest greater available (ideal bound) value', () => {
      assert.strictEqual(
        Software.getInboundBandwith('SKYPE', 4, 'ideal'),
        4000
      )
    })

    it('should return the last available value if participants number is greater than available values', () => {
      assert.strictEqual(
        Software.getInboundBandwith('SKYPE', 8, 'ideal'),
        8000
      )
    })
  })
})
