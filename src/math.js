export function average(...args) {
  const first = args[0];
  const array = typeof first === "number" ? args : first;
  let total = 0;
  for (let float of array) {
    total += float;
  }
  return total / array.length;
}

export function ceil(num, increment = 1) {
  return increment * Math.ceil(num / increment);
}

export function circleIntersection(centerA, radiusA, centerB, radiusB) {
  const dx = centerB.x - centerA.x;
  const dy = centerB.y - centerA.y;
  const d = Math.sqrt(dy * dy + dx * dx);
  if (d > radiusA + radiusB || d < Math.abs(radiusA - radiusB)) {
    return [];
  }
  const a = (radiusA * radiusA - radiusB * radiusB + d * d) / (2 * d);
  const x2 = centerA.x + (dx * a) / d;
  const y2 = centerA.y + (dy * a) / d;
  const h = Math.sqrt(radiusA * radiusA - a * a);
  const rx = -dy * (h / d);
  const ry = dx * (h / d);
  const i1 = {
    x: x2 + rx,
    y: y2 + ry
  };
  const i2 = {
    x: x2 - rx,
    y: y2 - ry
  };
  const points = [i1];
  if (i1.x !== i2.x || i1.y !== i2.y) {
    points.push(i2);
  }
  return points;
}

export function ease(current, dest, speed = 0.05) {
  return (current += (dest - current) * speed);
}

export function easeProp(targ, key, dest, speed) {
  const current = ease(targ[key], dest, speed);
  targ[key] = current;
  return current;
}

export function euclid(a, b) {
  if (b === 0) {
    return a;
  } else {
    return euclid(b, a % b);
  }
}

export function floor(num, increment = 1) {
  return increment * Math.floor(num / increment);
}

export function intLength(num) {
  if (!num) {
    return 0;
  }
  const abs = Math.abs(num);
  let len = Math.ceil(Math.log(abs) / Math.LN10);
  const log = Math.log10(abs);
  if (log === Math.floor(log)) {
    len++;
  }
  return len;
}

export function luhn(num) {
  let check;
  let even = true;
  let total = 0;
  while (num > 1) {
    let d = num % 10;
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
  const numCheck = (10 - (total % 10)) % 10;
  return check === numCheck;
}

export function modulo(num, limit) {
  if (!limit) {
    return 0;
  }
  const mod = num % limit;
  if (num >= 0) {
    return mod;
  } else if (mod < 0) {
    return (mod + limit) % limit;
  } else {
    return 0;
  }
}

export function primes(limit) {
  const sieve = [];
  const primes = [];
  for (let i = 2; i <= limit; ++i) {
    if (!sieve[i]) {
      primes.push(i);
      for (let j = i * 2; j <= limit; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
}

export function random(limitA = 1, limitB = 0, round = false, choke = 1) {
  let total = 0;
  if (!round) {
    for (let i = 0; i < choke; i++) {
      total += Math.random() * ((limitB - limitA) / choke);
    }
    return limitA + total;
  } else {
    const low = Math.ceil(Math.min(limitA, limitB));
    const high = Math.floor(Math.max(limitA, limitB));
    for (let i = 0; i < choke; i++) {
      total += Math.random() * ((high + 1 - low) / choke);
    }
    return Math.floor(low + total);
  }
}

export function randomItem(array, choke = 1) {
  return array[random(0, array.length - 1, true, choke)];
}

export function randomDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

export function randomBoolean() {
  return Math.random() > 0.5 ? true : false;
}

export function relativePercentage(start, end, current) {
  return (current - start) / (end - start);
}

export function round(num, increment = 1) {
  return increment * Math.round(num / increment);
}

export function shuffle(array, duplicate) {
  const shuffledArray = duplicate ? [...array] : array;
  for (let i = 0, length = array.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * (length - i));
    const dest = shuffledArray[length - 1 - i];
    shuffledArray[length - 1 - i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = dest;
  }
  return shuffledArray;
}

export function sortAscending(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

export function sortDescending(a, b) {
  return a > b ? -1 : a < b ? 1 : 0;
}

export function splitUint(num) {
  const length = intLength(num);
  const split = [];
  for (let i = 0; i < length; i++) {
    const d = num % 10;
    split.unshift(d);
    num = (num - d) / 10;
  }
  return split;
}

export function toDegrees(radians, offset = false) {
  return ((-radians + (offset ? Math.PI / 2 : 0)) * 180) / Math.PI;
}

export function toRadians(degrees, offset = false) {
  return ((-degrees - (offset ? 90 : 0)) * Math.PI) / 180;
}

export function total(array) {
  let sum = 0;
  for (let i = 0, length = array.length; i < length; i++) {
    const value = array[i];
    if (typeof value === "number" && !isNaN(value)) {
      sum += value;
    } else if (value) {
      sum++;
    }
  }
  return sum;
}
