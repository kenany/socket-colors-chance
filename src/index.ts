import factorial from 'factorial';

const X = 22;

/** Options describing the item and the desired socket colors. */
export interface SocketColorsChanceOptions {
  /** Number of sockets on the item. Must be between 1 and 6 inclusive. */
  sockets: number;

  /** Desired number of red sockets. */
  red?: number;

  /** Desired number of green sockets. */
  green?: number;

  /** Desired number of blue sockets. */
  blue?: number;

  /** Strength requirement of the item. */
  strength?: number;

  /** Dexterity requirement of the item. */
  dexterity?: number;

  /** Intelligence requirement of the item. */
  intelligence?: number;
}

/**
 * Compute the probability of rolling a desired combination of socket colors on
 * a Path of Exile item.
 *
 * @param opts - The item's sockets, attribute requirements, and the desired
 * socket colors. `opts.sockets` and at least one of `opts.red`, `opts.green`,
 * or `opts.blue` are required.
 * @returns The probability, between `0` and `1`, of rolling the desired socket
 * colors.
 *
 * @example
 * ```typescript
 * socketColorsChance({ sockets: 3, red: 1, green: 1, blue: 1 });
 * // => 0.2222222222222222
 * ```
 */
export function socketColorsChance(opts: SocketColorsChanceOptions): number {
  if (!opts.sockets || opts.sockets < 1 || opts.sockets > 6) {
    throw new Error('expected: 0 < opts.sockets < 7');
  }

  const red = opts.red || 0;
  const green = opts.green || 0;
  const blue = opts.blue || 0;

  if (
    red < 0 ||
    green < 0 ||
    blue < 0 ||
    red + blue + green === 0 ||
    red + blue + green > opts.sockets
  ) {
    throw new Error('invalid number of desired sockets');
  }

  let strength = opts.strength || 0;
  let dexterity = opts.dexterity || 0;
  let intelligence = opts.intelligence || 0;

  if (strength > 0 && dexterity === 0 && intelligence === 0) {
    strength += 32;
  } else if (strength === 0 && dexterity > 0 && intelligence === 0) {
    dexterity += 32;
  } else if (strength === 0 && dexterity === 0 && intelligence > 0) {
    intelligence += 32;
  }

  if (strength < 0 || dexterity < 0 || intelligence < 0) {
    throw new Error('expected: non-negative strength, dexterity, intelligence');
  }

  const div = strength + dexterity + intelligence + 3 * X;

  const rc = (X + strength) / div;
  const gc = (X + dexterity) / div;
  const bc = (X + intelligence) / div;

  function multinomial(
    red: number,
    green: number,
    blue: number,
    free: number,
    pos = 1
  ): number {
    if (free > 0) {
      return (
        (pos <= 1 ? multinomial(red + 1, green, blue, free - 1, 1) : 0) +
        (pos <= 2 ? multinomial(red, green + 1, blue, free - 1, 2) : 0) +
        multinomial(red, green, blue + 1, free - 1, 3)
      );
    }
    return (
      (factorial(red + green + blue) /
        (factorial(red) * factorial(green) * factorial(blue))) *
      rc ** red *
      gc ** green *
      bc ** blue
    );
  }

  return multinomial(red, green, blue, opts.sockets - red - green - blue);
}
