import * as math from '../src/math'
import { expect } from 'chai'

const TRUNCATE = 100000
const RANGE = 10
const REPEAT = 100

function randomConstraint(range = RANGE) {
  return Math.random() * range * 2 - range
}

function repeatTest(func, results) {
  for (let i = 0; i < REPEAT; i++) {
    const result = func()
    if (results) {
      results[result] = (results[result] || 0) + 1
    }
  }
}

function distance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2))
}

describe('math', function() {
  describe('average', function() {
    it('averages numbers in an array', function() {
      expect(math.average([1, 2, 3])).to.equal(2)
    })

    it('averages arguments', function() {
      expect(math.average(1, 2, 3)).to.equal(2)
    })
  })

  describe('ceil', function() {
    it('rounds up to nearest multiple of increment', repeatTest.bind(null, function() {
      let float = randomConstraint(100)
      float *= TRUNCATE
      float = Math.round(float)
      float /= TRUNCATE
      let limit = randomConstraint(10)
      limit *= TRUNCATE
      limit = Math.round(limit)
      limit /= limit
      const result = math.ceil(float, limit)
      expect(result % limit).to.equal(0)
      expect(result).to.not.be.below(float)
    }, null))

    it('defaults limit to 1', function() {
      let float = randomConstraint(100)
      expect(math.ceil(float)).to.equal(Math.ceil(float))
    })
  })

  describe('circleIntersection', function() {
    it('fonts both intersections', function() {
      const points = math.circleIntersection(
        { x: 0, y: 0 },
        5,
        { x: 5, y: 5 },
        5,
      )
      expect(distance(points[0], {x: 0, y: 5})).to.be.below(0.0001)
      expect(distance(points[1], {x: 5, y: 0})).to.be.below(0.0001)
    })

    it('finds only intersection', function() {
      expect(math.circleIntersection(
        { x: 0, y: 0 },
        10,
        { x: 20, y: 0 },
        10,
      )).to.deep.equal([{ x: 10, y: 0 }])
    })

    it('finds no intersection', function() {
      expect(math.circleIntersection(
        { x: 0, y: 0 },
        10,
        { x: 100, y: 0 },
        10,
      )).to.deep.equal([])
    })
  })

  describe('ease', function() {
    it('eases value towards dest', function() {
      const init = 10
      const dest = 0
      const current = math.ease(init, dest)
      expect(Math.abs(dest - current)).to.be.below(Math.abs(dest - init))
    })

    it('eases faster with a higher speed', function() {
      const init = 10
      const dest = 0
      let a = math.ease(init, dest)
      let b = math.ease(init, dest, 0.9)
      expect(Math.abs(dest - b)).to.be.below(Math.abs(dest - a))
    })

    it('eases with decreasing increments', function() {
      const dest = 0
      const a = 10
      const b = math.ease(a, dest)
      const c = math.ease(b, dest)
      expect(Math.abs(b - c)).to.be.below(Math.abs(a - b))
    })
  })

  describe('easeProp', function() {
    it('eases object’s property toward dest', function() {
      const init = 10
      const obj = { prop: init }
      const dest = 0
      math.easeProp(obj, 'prop', dest)
      expect(Math.abs(dest - obj.prop)).to.be.below(Math.abs(dest - init))
    })
  })

  describe('euclid', function() {
    it('finds greatest common divisor', function() {
      expect(math.euclid(12, 30)).to.equal(6)
      expect(math.euclid(12, 31)).to.equal(1)
    })
  })

  describe('floor', function() {
    it('rounds down to nearest multiple of increment', repeatTest.bind(null, function() {
      let float = randomConstraint(100)
      float *= TRUNCATE
      float = Math.round(float)
      float /= TRUNCATE
      let limit = randomConstraint(10)
      limit *= TRUNCATE
      limit = Math.round(limit)
      limit /= limit
      const result = math.floor(float, limit)
      expect(result % limit).to.equal(0)
      expect(result).to.not.be.above(float)
    }, null))

    it('defaults limit to 1', function() {
      let float = randomConstraint(100)
      expect(math.floor(float)).to.equal(Math.floor(float))
    })
  })

  describe('intLength', function() {
    it('finds digits in integer', function() {
      for (let i = 10000; i >= -10000; i--) {
        const len = math.intLength(i)
        if (i) {
          expect(len).to.equal(String(i).replace('-', '').length)
        } else {
          expect(len).to.equal(0)
        }
      }
    })
  })

  describe('luhn', function() {
    it('determines if integer meets luhn algorithm', function() {
      expect(math.luhn(4111111111111111)).to.equal(true)
      expect(math.luhn(4111111111111112)).to.equal(false)
      expect(math.luhn(4242424242424242)).to.equal(true)
      expect(math.luhn(4242424242424241)).to.equal(false)
      expect(math.luhn(5500000000000004)).to.equal(true)
      expect(math.luhn(5500000000000003)).to.equal(false)
      expect(math.luhn(10)).to.equal(true)
    })
  })

  describe('modulo', function() {
    const MAX = 10
    it('returns 0 when limit is 0', function() {
      for (let float = -MAX; float < MAX; float++) {
        expect(math.modulo(float, 0))
      }
    })

    it('returns the remainder when float is positive', function() {
      for (let float = 0; float < MAX; float++) {
        for (let limit = -MAX; limit < MAX; limit++) {
          if (limit) {
            expect(math.modulo(float, limit)).to.equal(float % limit)
          }
        }
      }
    })

    it('returns the remainder plus limit*x when float is negative', function() {
      for (let float = -MAX; float < 0; float++) {
        for (let limit = -MAX; limit < MAX; limit++) {
          if (limit) {
            expect(math.modulo(float, limit)).to.equal((float + limit * MAX) % limit)
          }
        }
      }
    })
  })

  describe('primes', function() {
    it('returns all prime numbers below uint limit', function() {
      expect(math.primes(20)).to.deep.equal([2, 3, 5, 7, 11, 13, 17, 19])
    })

    it('returns [] when negative or 0 limit', function() {
      expect(math.primes(-20)).to.deep.equal([])
    })
  })

  describe('random', function() {
    it('does not repeat', function() {
      const results = {}
      repeatTest(function() {
        const r = String(math.random(1, 2))
        expect(results[r]).to.equal(undefined)
        results[r] = true
      }, null)
    })

    it('stays within float constraints', repeatTest.bind(null, function() {
      const a = randomConstraint()
      const b = randomConstraint()
      const low = Math.min(a, b)
      const high = Math.max(a, b)
      const num = math.random(a, b)
      expect(low < num && num < high).to.equal(true)
      expect(num % 1).to.not.equal(0)
    }, null))

    it('stays within int constraints', repeatTest.bind(null, function() {
        const a = randomConstraint()
        const b = randomConstraint()
        const low = Math.min(a, b)
        const high = Math.max(a, b)
        const num = math.random(a, b, true)
        expect(
          (low < num && num <= Math.floor(high)) ||
          num === Math.ceil(low)
        ).to.equal(true)
        expect(num % 1).to.equal(0)
    }, null))

    it('picks all ints within a range', function() {
      const results = []
      const low = 0
      const high = RANGE
      repeatTest(function() {
        return math.random(low, high, true)
      }, results)
      expect(results[low]).to.be.above(0)
      expect(results[high]).to.be.above(0)
    })

    it('should be choked', repeatTest.bind(null, function() {
      const results = []
      repeatTest(function() {
        return math.random(RANGE, undefined, true, 2)
      }, results)
      const middle = results[Math.floor(RANGE / 2)]
      expect(results[0] || 0).to.be.below(middle)
      expect(results[RANGE] || 0).to.be.below(middle)
    }, null))

    it('defaults to 1', repeatTest.bind(null, function() {
      const result = math.random()
      expect(result).to.be.below(1)
      expect(result).to.be.above(0)
    }, null))
  })


  describe('randomItem', function() {
    it('returns value from array', function() {
      repeatTest(function() {
        const array = []
        const len = math.random(1, RANGE, true)
        for (let i = 0; i < len; i++) {
          array.push(math.random(RANGE))
        }
        expect(array.indexOf(math.randomItem(array))).to.be.above(-1)
        expect(array.indexOf(math.randomItem(array, 2))).to.be.above(-1)
      })
    })
  })

  describe('randomDirection', function() {
    it('returns 1 or -1', function() {
      repeatTest(function() {
        expect([-1, 1]).to.include(math.randomDirection())
      })
    })
  })

  describe('randomBoolean', function() {
    it('returns true or false', function() {
      repeatTest(function() {
        expect([true, false]).to.include(math.randomBoolean())
      })
    })
  })

  describe('relativePercentage', function() {
    it('finds progress of current relative between start and end', function() {
        expect(math.relativePercentage(0, 10, 5)).to.equal(0.5)
        expect(math.relativePercentage(10, 30, 25)).to.equal(0.75)
        expect(math.relativePercentage(30, 10, 25)).to.equal(0.25)
        expect(math.relativePercentage(-1, -2, -1.75)).to.equal(0.75)
        expect(math.relativePercentage(-2, -1, -1.75)).to.equal(0.25)
    })
  })

  describe('round', function() {
    it('rounds down to nearest multiple of increment', repeatTest.bind(null, function() {
      let float = randomConstraint(100)
      float *= TRUNCATE
      float = Math.round(float)
      float /= TRUNCATE
      let limit = randomConstraint(10)
      limit *= TRUNCATE
      limit = Math.round(limit)
      limit /= limit
      const result = math.round(float, limit)
      expect(result % limit).to.equal(0)
      const diff = Math.abs(float - result)
      expect(diff).to.be.below(Math.abs(float - (result - limit)))
      expect(diff).to.be.below(Math.abs(float - (result + limit)))
    }, null))

    it('defaults limit to 1', function() {
      let float = randomConstraint(100)
      expect(math.round(float)).to.equal(Math.round(float))
    })
  })

  describe('shuffle', function() {
    const limit = 10
    it('shuffles array', function() {
      const array = []
      for (let i = 0; i < limit; i++) {
        array.push(i)
      }
      const result = math.shuffle(array)
      expect(result).to.equal(array)
      for (let i = 0; i < limit; i++) {
        expect(array.indexOf(result[i])).to.be.above(-1)
      }
    })

    it('makes shuffled copy of array', function() {
      const array = []
      for (let i = 0; i < limit; i++) {
        array.push(i)
      }
      const result = math.shuffle(array, true)
      expect(result).to.not.equal(array)
      for (let i = 0; i < limit; i++) {
        expect(array.indexOf(result[i])).to.be.above(-1)
      }
    })
  })

  describe('sortAscending', function() {
    it('returns 1 when a above b, -1 when be above a, and 0 when equal', repeatTest.bind(null, function() {
      const array = []
      const length = math.random(0, 10, true)
      for (let i = 0; i < length; i++) {
        array.push(Math.random())
      }
      array.push(array[0])
      array.sort(math.sortAscending)
      for (let i = 0; i < length; i++) {
        expect(array[i + 1]).to.not.be.below(array[0])
      }
    }, null))
  })

  describe('sortDescending', function() {
    it('returns -1 when a above b, 1 when be above a, and 0 when equal', repeatTest.bind(null, function() {
      const array = []
      const length = math.random(0, 10, true)
      for (let i = 0; i < length; i++) {
        array.push(Math.random())
      }
      array.push(array[0])
      array.sort(math.sortDescending)
      for (let i = 0; i < length; i++) {
        expect(array[i + 1]).to.not.be.above(array[0])
      }
    }, null))
  })

  describe('splitUint', function() {
    it('makes array from digits of a uint', repeatTest.bind(null, function() {
      const uint = math.random(0, 10000000, true)
      const result = math.splitUint(uint)
      const split = String(uint).split('')
      for (let i = 0, length = split.length; i < length; i++) {
        split[i] = parseInt(split[i])
      }
      expect(result).to.deep.equal(split)
    }, null))
  })

  describe('toDegrees', function() {
    it('converts radians to degrees as an amount different than zero', function() {
      expect(math.toDegrees(Math.PI * -2.5)).to.equal(450)
      expect(math.toDegrees(Math.PI * -2)).to.equal(360)
      expect(math.toDegrees(Math.PI * -1.5)).to.equal(270)
      expect(math.toDegrees(Math.PI * -1)).to.equal(180)
      expect(math.toDegrees(Math.PI * -0.5)).to.equal(90)
      expect(math.toDegrees(0)).to.equal(0)
      expect(math.toDegrees(Math.PI * 0.5)).to.equal(-90)
      expect(math.toDegrees(Math.PI)).to.equal(-180)
      expect(math.toDegrees(Math.PI * 1.5)).to.equal(-270)
      expect(math.toDegrees(Math.PI * 2)).to.equal(-360)
      expect(math.toDegrees(Math.PI * 2.5)).to.equal(-450)
    })

    it('converts radians to degrees as an actual direction', function() {
      expect(math.toDegrees(Math.PI * -2.5, true)).to.equal(540)
      expect(math.toDegrees(Math.PI * -2, true)).to.equal(450)
      expect(math.toDegrees(Math.PI * -1.5, true)).to.equal(360)
      expect(math.toDegrees(Math.PI * -1, true)).to.equal(270)
      expect(math.toDegrees(Math.PI * -0.5, true)).to.equal(180)
      expect(math.toDegrees(0, true)).to.equal(90)
      expect(math.toDegrees(Math.PI * 0.5, true)).to.equal(0)
      expect(math.toDegrees(Math.PI, true)).to.equal(-90)
      expect(math.toDegrees(Math.PI * 1.5, true)).to.equal(-180)
      expect(math.toDegrees(Math.PI * 2, true)).to.equal(-270)
      expect(math.toDegrees(Math.PI * 2.5, true)).to.equal(-360)
      expect(math.toDegrees(Math.PI * 3, true)).to.equal(-450)
    })
  })

  describe('toRadians', function() {
    it('converts degrees to radians as an amount different than zero', function() {
      expect(math.toRadians(-450)).to.equal(Math.PI * 2.5)
      expect(math.toRadians(-360)).to.equal(Math.PI * 2)
      expect(math.toRadians(-270)).to.equal(Math.PI * 1.5)
      expect(math.toRadians(-180)).to.equal(Math.PI)
      expect(math.toRadians(-90)).to.equal(Math.PI * 0.5)
      expect(math.toRadians(0)).to.equal(0)
      expect(math.toRadians(90)).to.equal(Math.PI * -0.5)
      expect(math.toRadians(180)).to.equal(Math.PI * -1)
      expect(math.toRadians(270)).to.equal(Math.PI * -1.5)
      expect(math.toRadians(360)).to.equal(Math.PI * -2)
      expect(math.toRadians(450)).to.equal(Math.PI * -2.5)
    })

    it('converts degrees to radians as an actual direction', function() {
      expect(math.toRadians(-540, true)).to.equal(Math.PI * 2.5)
      expect(math.toRadians(-450, true)).to.equal(Math.PI * 2)
      expect(math.toRadians(-360, true)).to.equal(Math.PI * 1.5)
      expect(math.toRadians(-270, true)).to.equal(Math.PI * 1)
      expect(math.toRadians(-180, true)).to.equal(Math.PI * 0.5)
      expect(math.toRadians(-90, true)).to.equal(0)
      expect(math.toRadians(0, true)).to.equal(Math.PI * -0.5)
      expect(math.toRadians(90, true)).to.equal(Math.PI * -1)
      expect(math.toRadians(180, true)).to.equal(Math.PI * -1.5)
      expect(math.toRadians(270, true)).to.equal(Math.PI * -2)
      expect(math.toRadians(360, true)).to.equal(Math.PI * -2.5)
      expect(math.toRadians(450, true)).to.equal(Math.PI * -3)
    })
  })

  describe('total', function() {
    it('adds all the values of an array of numbers', function() {
      const array = []
      let total = 0
      const length = math.random(0, 100, true)
      for (let i = 0; i < length; i++) {
        const value = Math.random()
        array.push(value)
        total += value
      }
      expect(math.total(array)).to.equal(total)
    })

    it('finds the totals amount of positive values of an array of non numbers', function() {
      const truthyValues = [true, 1, 'rumplestiltskin', {}, []]
      const nonTruthyValues = [false, 0, null, undefined, NaN, '']
      const array = []
      let total = 0
      const length = math.random(0, 100, true)
      for (let i = 0; i < length; i++) {
        const value = Math.random() > 0.5
        if (value) {
          array.push(math.randomItem(truthyValues))
          total += 1
        } else {
          array.push(math.randomItem(nonTruthyValues))
        }
      }
      expect(math.total(array)).to.equal(total)
    })
  })
})
