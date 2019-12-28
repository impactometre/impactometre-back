'use strict'

const assert = require('assert')
// const Software = require('../../../../model/services/meeting/software')
const softwareDatabase = require('../../../../model/database/meeting/software')
const Software = require('../../../../model/classes/Software')

describe('Software services', () => {
  describe('#getInboundBandwith()', () => {
    const renavisio = new Software(softwareDatabase.RENAVISIO)
    it('should return the unique available value', () => {
      assert.strictEqual(
        renavisio.getInboundBandwith('RENAVISIO'),
        1080
      )
    })

    it('should return the unique available value even if number of participants specified', () => {
      assert.strictEqual(
        renavisio.getInboundBandwith(3),
        1080
      )
    })

    const skype = new Software(softwareDatabase.SKYPE)
    it('should return the matching available (minimum bound) value', () => {
      assert.strictEqual(
        skype.getInboundBandwith(2, 'minimum'),
        30
      )
    })

    it('should return the matching available ideal bound value when no bound specified', () => {
      assert.strictEqual(
        skype.getInboundBandwith(2),
        1050
      )
    })

    it('should return the closest greater available (ideal bound) value', () => {
      assert.strictEqual(
        skype.getInboundBandwith(4, 'ideal'),
        4000
      )
    })

    it('should return the last available value if participants number is greater than available values', () => {
      assert.strictEqual(
        skype.getInboundBandwith(8, 'ideal'),
        8000
      )
    })
  })
})
