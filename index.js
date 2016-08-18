'use strict';

import factorial from 'factorial';

const X = 22;

function chance(opts) {
  if (!opts.sockets || opts.sockets < 1 || opts.sockets > 6) {
    throw new Error('expected: 0 < opts.sockets < 7');
  }

  const red = opts.red || 0;
  const green = opts.green || 0;
  const blue = opts.blue || 0;

  if (red < 0 || green < 0 || blue < 0
    || red + blue + green === 0
    || red + blue + green > opts.sockets) {
    throw new Error('invalid number of desired sockets');
  }

  let strength = opts.strength || 0;
  let dexterity = opts.dexterity || 0;
  let intelligence = opts.intelligence || 0;

  if (strength > 0 && dexterity === 0 && intelligence === 0) {
    strength += 32;
  }
  else if (strength === 0 && dexterity > 0 && intelligence === 0) {
    dexterity += 32;
  }
  else if (strength === 0 && dexterity === 0 && intelligence > 0) {
    intelligence += 32;
  }

  if (strength < 0 || dexterity < 0 || intelligence < 0) {
    throw new Error('expected: non-negative strength, dexterity, intelligence');
  }

  const div = strength + dexterity + intelligence + 3 * X;

  const rc = (X + strength) / div;
  const gc = (X + dexterity) / div;
  const bc = (X + intelligence) / div;

  function multinomial(red, green, blue, free, pos = 1) {
    if (free > 0) {
      return (pos <= 1 ? multinomial(red + 1, green, blue, free - 1, 1) : 0)
        + (pos <= 2 ? multinomial(red, green + 1, blue, free - 1, 2) : 0)
        + multinomial(red, green, blue + 1, free - 1, 3);
    }
    return factorial(red + green + blue) / (factorial(red) * factorial(green)
      * factorial(blue)) * Math.pow(rc, red) * Math.pow(gc, green)
      * Math.pow(bc, blue);
  }

  return multinomial(red, green, blue, opts.sockets - red - green - blue);
}

export default chance;
