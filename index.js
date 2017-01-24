"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.average = average;
exports.ceil = ceil;
exports.circleIntersection = circleIntersection;
exports.ease = ease;
exports.easeProp = easeProp;
exports.euclid = euclid;
exports.floor = floor;
exports.intLength = intLength;
exports.luhn = luhn;
exports.modulo = modulo;
exports.primes = primes;
exports.random = random;
exports.randomChoice = randomChoice;
exports.relativePercentage = relativePercentage;
exports.round = round;
exports.shuffle = shuffle;
exports.sortAscending = sortAscending;
exports.sortDescending = sortDescending;
exports.splitUint = splitUint;
exports.toDegrees = toDegrees;
exports.toRadians = toRadians;
exports.total = total;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function average() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var first = args[0];
  var array = typeof first === 'number' ? args : first;
  var total = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var float = _step.value;

      total += float;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return total / array.length;
}

function ceil(num) {
  var increment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return increment * Math.ceil(num / increment);
}

function circleIntersection(centerA, radiusA, centerB, radiusB) {
  var dx = centerB.x - centerA.x;
  var dy = centerB.y - centerA.y;
  var d = Math.sqrt(dy * dy + dx * dx);
  if (d > radiusA + radiusB || d < Math.abs(radiusA - radiusB)) {
    return [];
  }
  var a = (radiusA * radiusA - radiusB * radiusB + d * d) / (2 * d);
  var x2 = centerA.x + dx * a / d;
  var y2 = centerA.y + dy * a / d;
  var h = Math.sqrt(radiusA * radiusA - a * a);
  var rx = -dy * (h / d);
  var ry = dx * (h / d);
  var i1 = {
    x: x2 + rx,
    y: y2 + ry
  };
  var i2 = {
    x: x2 - rx,
    y: y2 - ry
  };
  var points = [i1];
  if (i1.x !== i2.x || i1.y !== i2.y) {
    points.push(i2);
  }
  return points;
}

function ease(current, dest) {
  var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;

  return current += (dest - current) * speed;
}

function easeProp(targ, key, dest, speed) {
  var current = ease(targ[key], dest, speed);
  targ[key] = current;
  return current;
}

function euclid(a, b) {
  if (b === 0) {
    return a;
  } else {
    return euclid(b, a % b);
  }
}

function floor(num) {
  var increment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return increment * Math.floor(num / increment);
}

function intLength(num) {
  if (!num) {
    return 0;
  }
  var abs = Math.abs(num);
  var len = Math.ceil(Math.log(abs) / Math.LN10);
  var log = Math.log10(abs);
  if (log === Math.floor(log)) {
    len++;
  }
  return len;
}

function luhn(num) {
  var check = void 0;
  var even = true;
  var total = 0;
  while (num > 1) {
    var d = num % 10;
    num = (num - d) / 10;
    if (check === undefined) {
      check = d;
    } else {
      if (!even) {
        d *= 2;
        if (d > 9) {
          d -= 9;
        }
      }
      total += d;
    }
    even = !even;
  }
  var numCheck = (10 - total % 10) % 10;
  return check === numCheck;
}

function modulo(num, limit) {
  if (!limit) {
    return 0;
  }
  var mod = num % limit;
  if (num >= 0) {
    return mod;
  } else if (mod < 0) {
    return (mod + limit) % limit;
  } else {
    return 0;
  }
}

function primes(limit) {
  var sieve = [];
  var primes = [];
  for (var i = 2; i <= limit; ++i) {
    if (!sieve[i]) {
      primes.push(i);
      for (var j = i * 2; j <= limit; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
}

function random() {
  var limitA = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var limitB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var round = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var choke = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var total = 0;
  if (!round) {
    for (var i = 0; i < choke; i++) {
      total += Math.random() * ((limitB - limitA) / choke);
    }
    return limitA + total;
  } else {
    var low = Math.ceil(Math.min(limitA, limitB));
    var high = Math.floor(Math.max(limitA, limitB));
    for (var _i = 0; _i < choke; _i++) {
      total += Math.random() * ((high + 1 - low) / choke);
    }
    return Math.floor(low + total);
  }
}

function randomChoice() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [-1, 1];
  var choke = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return array[random(0, array.length - 1, true, choke)];
}

function relativePercentage(start, end, current) {
  return (current - start) / (end - start);
}

function round(num) {
  var increment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return increment * Math.round(num / increment);
}

function shuffle(array, duplicate) {
  // todo: optimize shuffle for copying
  var shuffledArray = duplicate ? [].concat(_toConsumableArray(array)) : array;
  for (var i = 0, length = array.length; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * (length - i));
    var dest = shuffledArray[length - 1 - i];
    shuffledArray[length - 1 - i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = dest;
  }
  return shuffledArray;
}

function sortAscending(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

function sortDescending(a, b) {
  return a > b ? -1 : a < b ? 1 : 0;
}

function splitUint(num) {
  var length = intLength(num);
  var split = [];
  for (var i = 0; i < length; i++) {
    var d = num % 10;
    split.unshift(d);
    num = (num - d) / 10;
  }
  return split;
}

function toDegrees(radians) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return (-radians + (offset ? Math.PI / 2 : 0)) * 180 / Math.PI;
}

function toRadians(degrees) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return (-degrees - (offset ? 90 : 0)) * Math.PI / 180;
}

function total(array) {
  var sum = 0;
  for (var i = 0, length = array.length; i < length; i++) {
    var value = array[i];
    if (typeof value === "number" && !isNaN(value)) {
      sum += value;
    } else if (value) {
      sum++;
    }
  }
  return sum;
}
