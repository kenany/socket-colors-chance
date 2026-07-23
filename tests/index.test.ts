import { socketColorsChance } from 'socket-colors-chance';
import { describe, expect, it } from 'vitest';

const INVALID_SOCKETS = /expected: 0 < opts.sockets < 7/;
const INVALID_DESIRED_SOCKETS = /invalid number of desired sockets/;

describe('socketColorsChance', () => {
  it('handles single sockets', () => {
    expect(socketColorsChance({ sockets: 1, red: 1 })).toBe(1 / 3);
    expect(socketColorsChance({ sockets: 1, green: 1 })).toBe(1 / 3);
    expect(socketColorsChance({ sockets: 1, blue: 1 })).toBe(1 / 3);
  });

  it('handles 3 sockets: 1R, 1G, 1B', () => {
    expect(socketColorsChance({ sockets: 3, red: 1, green: 1, blue: 1 })).toBe(
      0.222_222_222_222_222_2
    );
  });

  it('throws on invalid sockets', () => {
    const expected = INVALID_SOCKETS;

    // @ts-expect-error `sockets` is a required option.
    expect(() => socketColorsChance({})).toThrow(expected);
    expect(() => socketColorsChance({ sockets: 0 })).toThrow(expected);
    expect(() => socketColorsChance({ sockets: 7 })).toThrow(expected);
  });

  it('throws on invalid desired sockets', () => {
    const fixtures = [
      { red: -1 },
      { green: -2 },
      { blue: -3 },
      {},
      { red: 7 },
      { green: 8 },
      { blue: 9 },
      { red: 3, green: 2, blue: 2 },
    ];
    const invalidMsg = INVALID_DESIRED_SOCKETS;

    for (const fixture of fixtures) {
      expect(() => socketColorsChance({ ...fixture, sockets: 6 })).toThrow(
        invalidMsg
      );
    }
  });
});
