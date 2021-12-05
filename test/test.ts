import * as math from "../src/math";
import { expect } from "chai";
import fs from "fs";
import path from "path";

const TRUNCATE = 100000;
const RANGE = 10;
const REPEAT = 100;

function randomConstraint(range = RANGE) {
  return Math.random() * range * 2 - range;
}

function repeatTest(func, results) {
  for (let i = 0; i < REPEAT; i++) {
    const result = func();
    if (results) {
      results[result] = (results[result] || 0) + 1;
    }
  }
}

function distance(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
  );
}

describe("math", function() {
  describe("danehansen-math.min.js", function() {
    it("is minified", function() {
      const min = fs.readFileSync(
        path.join(__dirname, "../danehansen-math.min.js"),
        "utf8"
      );
      expect(min.match(/\n/g)).to.be.null;
    });
  });

  describe.only("average", function() {
    it("averages numbers in an array", function() {
      expect(math.average([1, 2, 3])).to.equal(2);
    });

    it("averages arguments", function() {
      expect(math.average(1, 2, 3)).to.equal(2);
    });
  });

  describe("ceil", function() {
    it(
      "rounds up to nearest multiple of increment",
      repeatTest.bind(
        null,
        function() {
          let float = randomConstraint(100);
          float *= TRUNCATE;
          float = Math.round(float);
          float /= TRUNCATE;
          let limit = randomConstraint(10);
          limit *= TRUNCATE;
          limit = Math.round(limit);
          limit /= limit;
          const result = math.ceil(float, limit);
          expect(result % limit).to.equal(0);
          expect(result).to.not.be.below(float);
        },
        null
      )
    );

    it("defaults limit to 1", function() {
      let float = randomConstraint(100);
      expect(math.ceil(float)).to.equal(Math.ceil(float));
    });
  });

  describe("circleIntersection", function() {
    it("fonts both intersections", function() {
      const points = math.circleIntersection(
        { x: 0, y: 0 },
        5,
        { x: 5, y: 5 },
        5
      );
      expect(distance(points[0], { x: 0, y: 5 })).to.be.below(0.0001);
      expect(distance(points[1], { x: 5, y: 0 })).to.be.below(0.0001);
    });

    it("finds only intersection", function() {
      expect(
        math.circleIntersection({ x: 0, y: 0 }, 10, { x: 20, y: 0 }, 10)
      ).to.deep.equal([{ x: 10, y: 0 }]);
    });

    it("finds no intersection", function() {
      expect(
        math.circleIntersection({ x: 0, y: 0 }, 10, { x: 100, y: 0 }, 10)
      ).to.deep.equal([]);
    });
  });

  describe("ease", function() {
    it("eases value towards dest", function() {
      const init = 10;
      const dest = 0;
      const current = math.ease(init, dest);
      expect(Math.abs(dest - current)).to.be.below(Math.abs(dest - init));
    });

    it("eases faster with a higher speed", function() {
      const init = 10;
      const dest = 0;
      let a = math.ease(init, dest);
      let b = math.ease(init, dest, 0.9);
      expect(Math.abs(dest - b)).to.be.below(Math.abs(dest - a));
    });

    it("eases with decreasing increments", function() {
      const dest = 0;
      const a = 10;
      const b = math.ease(a, dest);
      const c = math.ease(b, dest);
      expect(Math.abs(b - c)).to.be.below(Math.abs(a - b));
    });
  });

  describe("easeProp", function() {
    it("eases object’s property toward dest", function() {
      const init = 10;
      const obj = { prop: init };
      const dest = 0;
      math.easeProp(obj, "prop", dest);
      expect(Math.abs(dest - obj.prop)).to.be.below(Math.abs(dest - init));
    });
  });

  describe("euclid", function() {
    it("finds greatest common divisor", function() {
      expect(math.euclid(12, 30)).to.equal(6);
      expect(math.euclid(12, 31)).to.equal(1);
    });
  });

  describe("floor", function() {
    it(
      "rounds down to nearest multiple of increment",
      repeatTest.bind(
        null,
        function() {
          let float = randomConstraint(100);
          float *= TRUNCATE;
          float = Math.round(float);
          float /= TRUNCATE;
          let limit = randomConstraint(10);
          limit *= TRUNCATE;
          limit = Math.round(limit);
          limit /= limit;
          const result = math.floor(float, limit);
          expect(result % limit).to.equal(0);
          expect(result).to.not.be.above(float);
        },
        null
      )
    );

    it("defaults limit to 1", function() {
      let float = randomConstraint(100);
      expect(math.floor(float)).to.equal(Math.floor(float));
    });
  });

  describe("intLength", function() {
    it("finds digits in integer", function() {
      for (let i = 10000; i >= -10000; i--) {
        const len = math.intLength(i);
        if (i) {
          expect(len).to.equal(String(i).replace("-", "").length);
        } else {
          expect(len).to.equal(0);
        }
      }
    });
  });

  describe("luhn", function() {
    it("determines if integer meets luhn algorithm", function() {
      expect(math.luhn(4111111111111111)).to.equal(true);
      expect(math.luhn(4111111111111112)).to.equal(false);
      expect(math.luhn(4242424242424242)).to.equal(true);
      expect(math.luhn(4242424242424241)).to.equal(false);
      expect(math.luhn(5500000000000004)).to.equal(true);
      expect(math.luhn(5500000000000003)).to.equal(false);
      expect(math.luhn(10)).to.equal(true);
    });
  });

  describe("modulo", function() {
    const MAX = 10;
    it("returns 0 when limit is 0", function() {
      for (let float = -MAX; float < MAX; float++) {
        expect(math.modulo(float, 0));
      }
    });

    it("returns the remainder when float is positive", function() {
      for (let float = 0; float < MAX; float++) {
        for (let limit = -MAX; limit < MAX; limit++) {
          if (limit) {
            expect(math.modulo(float, limit)).to.equal(float % limit);
          }
        }
      }
    });

    it("returns the remainder plus limit*x when float is negative", function() {
      for (let float = -MAX; float < 0; float++) {
        for (let limit = -MAX; limit < MAX; limit++) {
          if (limit) {
            expect(math.modulo(float, limit)).to.equal(
              (float + limit * MAX) % limit
            );
          }
        }
      }
    });
  });

  describe("normalize", function() {
    it("returns a normalized value between two extremes", function() {
      expect(math.normalize(0, 10, 5)).to.equal(0.5);
      expect(math.normalize(10, 30, 25)).to.equal(0.75);
      expect(math.normalize(30, 10, 25)).to.equal(0.25);
      expect(math.normalize(-1, -2, -1.75)).to.equal(0.75);
      expect(math.normalize(-2, -1, -1.75)).to.equal(0.25);
    });
  });

  describe("primes", function() {
    it("returns all prime numbers below uint limit", function() {
      expect(math.primes(20)).to.deep.equal([2, 3, 5, 7, 11, 13, 17, 19]);
    });

    it("returns [] when negative or 0 limit", function() {
      expect(math.primes(-20)).to.deep.equal([]);
    });
  });

  describe("random", function() {
    it("does not repeat", function() {
      const results = {};
      repeatTest(function() {
        const r = String(math.random(1, 2));
        expect(results[r]).to.equal(undefined);
        results[r] = true;
      }, null);
    });

    it(
      "stays within float constraints",
      repeatTest.bind(
        null,
        function() {
          const a = randomConstraint();
          const b = randomConstraint();
          const low = Math.min(a, b);
          const high = Math.max(a, b);
          const num = math.random(a, b);
          expect(low < num && num < high).to.equal(true);
          expect(num % 1).to.not.equal(0);
        },
        null
      )
    );

    it(
      "stays within int constraints",
      repeatTest.bind(
        null,
        function() {
          const a = randomConstraint();
          const b = randomConstraint();
          const low = Math.min(a, b);
          const high = Math.max(a, b);
          const num = math.random(a, b, true);
          expect(
            (low < num && num <= Math.floor(high)) || num === Math.ceil(low)
          ).to.equal(true);
          expect(num % 1).to.equal(0);
        },
        null
      )
    );

    it("picks all ints within a range", function() {
      const results = [];
      const low = 0;
      const high = RANGE;
      repeatTest(function() {
        return math.random(low, high, true);
      }, results);
      expect(results[low]).to.be.above(0);
      expect(results[high]).to.be.above(0);
    });

    it(
      "should be choked",
      repeatTest.bind(
        null,
        function() {
          const results = [];
          repeatTest(function() {
            return math.random(RANGE, undefined, true, 2);
          }, results);
          const middle = results[Math.floor(RANGE / 2)];
          expect(results[0] || 0).to.be.below(middle);
          expect(results[RANGE] || 0).to.be.below(middle);
        },
        null
      )
    );

    it(
      "defaults to 1",
      repeatTest.bind(
        null,
        function() {
          const result = math.random();
          expect(result).to.be.below(1);
          expect(result).to.be.above(0);
        },
        null
      )
    );
  });

  describe("randomItem", function() {
    it("returns value from array", function() {
      repeatTest(function() {
        const array = [];
        const len = math.random(1, RANGE, true);
        for (let i = 0; i < len; i++) {
          array.push(math.random(RANGE));
        }
        expect(array.indexOf(math.randomItem(array))).to.be.above(-1);
        expect(array.indexOf(math.randomItem(array, 2))).to.be.above(-1);
      });
    });
  });

  describe("randomDirection", function() {
    it("returns 1 or -1", function() {
      repeatTest(function() {
        expect([-1, 1]).to.include(math.randomDirection());
      });
    });
  });

  describe("randomBoolean", function() {
    it("returns true or false", function() {
      repeatTest(function() {
        expect([true, false]).to.include(math.randomBoolean());
      });
    });
  });

  describe("round", function() {
    it(
      "rounds down to nearest multiple of increment",
      repeatTest.bind(
        null,
        function() {
          let float = randomConstraint(100);
          float *= TRUNCATE;
          float = Math.round(float);
          float /= TRUNCATE;
          let limit = randomConstraint(10);
          limit *= TRUNCATE;
          limit = Math.round(limit);
          limit /= limit;
          const result = math.round(float, limit);
          expect(result % limit).to.equal(0);
          const diff = Math.abs(float - result);
          expect(diff).to.be.below(Math.abs(float - (result - limit)));
          expect(diff).to.be.below(Math.abs(float - (result + limit)));
        },
        null
      )
    );

    it("defaults limit to 1", function() {
      let float = randomConstraint(100);
      expect(math.round(float)).to.equal(Math.round(float));
    });
  });

  describe("shuffle", function() {
    const limit = 10;
    it("shuffles array", function() {
      const array = [];
      for (let i = 0; i < limit; i++) {
        array.push(i);
      }
      const result = math.shuffle(array);
      expect(result).to.equal(array);
      for (let i = 0; i < limit; i++) {
        expect(array.indexOf(result[i])).to.be.above(-1);
      }
    });

    it("makes shuffled copy of array", function() {
      const array = [];
      for (let i = 0; i < limit; i++) {
        array.push(i);
      }
      const result = math.shuffle(array, true);
      expect(result).to.not.equal(array);
      for (let i = 0; i < limit; i++) {
        expect(array.indexOf(result[i])).to.be.above(-1);
      }
    });
  });

  describe("sortAscending", function() {
    it(
      "returns 1 when a above b, -1 when be above a, and 0 when equal",
      repeatTest.bind(
        null,
        function() {
          const array = [];
          const length = math.random(0, 10, true);
          for (let i = 0; i < length; i++) {
            array.push(Math.random());
          }
          array.push(array[0]);
          array.sort(math.sortAscending);
          for (let i = 0; i < length; i++) {
            expect(array[i + 1]).to.not.be.below(array[0]);
          }
        },
        null
      )
    );
  });

  describe("sortDescending", function() {
    it(
      "returns -1 when a above b, 1 when be above a, and 0 when equal",
      repeatTest.bind(
        null,
        function() {
          const array = [];
          const length = math.random(0, 10, true);
          for (let i = 0; i < length; i++) {
            array.push(Math.random());
          }
          array.push(array[0]);
          array.sort(math.sortDescending);
          for (let i = 0; i < length; i++) {
            expect(array[i + 1]).to.not.be.above(array[0]);
          }
        },
        null
      )
    );
  });

  describe("splitUint", function() {
    it(
      "makes array from digits of a uint",
      repeatTest.bind(
        null,
        function() {
          const uint = math.random(0, 10000000, true);
          const result = math.splitUint(uint);
          const split = String(uint).split("");
          for (let i = 0, length = split.length; i < length; i++) {
            split[i] = parseInt(split[i]);
          }
          expect(result).to.deep.equal(split);
        },
        null
      )
    );
  });

  describe('radians/degrees', function() {
    const OCLOCK_12 = 3 * Math.PI * 2 / 12;
    const OCLOCK_01 = 2 * Math.PI * 2 / 12;
    const OCLOCK_02 = 1 * Math.PI * 2 / 12;
    const OCLOCK_03 = 0 * Math.PI * 2 / 12;
    const OCLOCK_04 = 11 * Math.PI * 2 / 12;
    const OCLOCK_05 = 10 * Math.PI * 2 / 12;
    const OCLOCK_06 = 9 * Math.PI * 2 / 12;
    const OCLOCK_07 = 8 * Math.PI * 2 / 12;
    const OCLOCK_08 = 7 * Math.PI * 2 / 12;
    const OCLOCK_09 = 6 * Math.PI * 2 / 12;
    const OCLOCK_10 = 5 * Math.PI * 2 / 12;
    const OCLOCK_11 = 4 * Math.PI * 2 / 12;
    const TOLERANCE = 0.001;

    function toBeCloseTo(numA, numB) {
      expect(numA).to.be.within(numB - TOLERANCE, numB + TOLERANCE);
    }

    describe('toRadians', function() {
      it('converts an amount of degrees to radians', function() {
        toBeCloseTo(math.toRadians(-30), OCLOCK_02 * -1);
        toBeCloseTo(math.toRadians(0), OCLOCK_02 * 0);
        toBeCloseTo(math.toRadians(30), OCLOCK_02 * 1);
        toBeCloseTo(math.toRadians(60), OCLOCK_02 * 2);
        toBeCloseTo(math.toRadians(90), OCLOCK_02 * 3);
        toBeCloseTo(math.toRadians(120), OCLOCK_02 * 4);
        toBeCloseTo(math.toRadians(150), OCLOCK_02 * 5);
        toBeCloseTo(math.toRadians(180), OCLOCK_02 * 6);
        toBeCloseTo(math.toRadians(210), OCLOCK_02 * 7);
        toBeCloseTo(math.toRadians(240), OCLOCK_02 * 8);
        toBeCloseTo(math.toRadians(270), OCLOCK_02 * 9);
        toBeCloseTo(math.toRadians(300), OCLOCK_02 * 10);
        toBeCloseTo(math.toRadians(330), OCLOCK_02 * 11);
        toBeCloseTo(math.toRadians(360), OCLOCK_02 * 12);
        toBeCloseTo(math.toRadians(390), OCLOCK_02 * 13);
      });
    });

    describe('toDegrees', function() {
      it('converts an amount of radians to degrees', function() {
        toBeCloseTo(math.toDegrees(OCLOCK_02 * -1), -30);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 0), 0);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 1), 30);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 2), 60);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 3), 90);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 4), 120);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 5), 150);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 6), 180);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 7), 210);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 8), 240);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 9), 270);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 10), 300);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 11), 330);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 12), 360);
        toBeCloseTo(math.toDegrees(OCLOCK_02 * 13), 390);
      });
    });

    describe('toRadianDirection', function() {
      it('converts a direction in degrees to radians', function() {
        toBeCloseTo(math.toRadianDirection(-30), OCLOCK_11);
        toBeCloseTo(math.toRadianDirection(0), OCLOCK_12);
        toBeCloseTo(math.toRadianDirection(30), OCLOCK_01);
        toBeCloseTo(math.toRadianDirection(60), OCLOCK_02);
        toBeCloseTo(math.toRadianDirection(90), OCLOCK_03);
        toBeCloseTo(math.toRadianDirection(120), OCLOCK_04);
        toBeCloseTo(math.toRadianDirection(150), OCLOCK_05);
        toBeCloseTo(math.toRadianDirection(180), OCLOCK_06);
        toBeCloseTo(math.toRadianDirection(210), OCLOCK_07);
        toBeCloseTo(math.toRadianDirection(240), OCLOCK_08);
        toBeCloseTo(math.toRadianDirection(270), OCLOCK_09);
        toBeCloseTo(math.toRadianDirection(300), OCLOCK_10);
        toBeCloseTo(math.toRadianDirection(330), OCLOCK_11);
        toBeCloseTo(math.toRadianDirection(360), OCLOCK_12);
        toBeCloseTo(math.toRadianDirection(390), OCLOCK_01);
      });
    });

    describe('toDegreeDirection', function() {
      it('converts a direction in radians to degrees', function() {
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * -1), 120);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 0), 90);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 1), 60);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 2), 30);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 3), 0);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 4), 330);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 5), 300);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 6), 270);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 7), 240);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 8), 210);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 9), 180);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 10), 150);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 11), 120);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 12), 90);
        toBeCloseTo(math.toDegreeDirection(OCLOCK_02 * 13), 60);
      });
    });
  });

  describe("total", function() {
    it("adds all the values of an array of numbers", function() {
      const array = [];
      let total = 0;
      const length = math.random(0, 100, true);
      for (let i = 0; i < length; i++) {
        const value = Math.random();
        array.push(value);
        total += value;
      }
      expect(math.total(array)).to.equal(total);
    });

    it("finds the totals amount of positive values of an array of non numbers", function() {
      const truthyValues = [true, 1, "rumplestiltskin", {}, []];
      const nonTruthyValues = [false, 0, null, undefined, NaN, ""];
      const array = [];
      let total = 0;
      const length = math.random(0, 100, true);
      for (let i = 0; i < length; i++) {
        const value = Math.random() > 0.5;
        if (value) {
          array.push(math.randomItem(truthyValues));
          total += 1;
        } else {
          array.push(math.randomItem(nonTruthyValues));
        }
      }
      expect(math.total(array)).to.equal(total);
    });
  });
});
