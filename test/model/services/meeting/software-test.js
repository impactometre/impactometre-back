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
})
