# socket-colors-chance

Get the chances of getting specific socket colors on a [Path of Exile][poe]
item.

This was extracted out of [`chromatic-orb`][chromatic] since the math also
applies to [Vorici's][vorici] recipes. Formula is based on
[Siveran's calculator][siveran], which is based on
[Lawphill's calculator][lawphill].

## Example

``` javascript
var socketColorsChance = require('socket-colors-chance');

socketColorsChance({
  sockets: 3,
  red: 1,
  green: 1,
  blue: 1
});
// => 0.2222222222222222
```

## Installation

``` bash
$ npm install socket-colors-chance
```

## API

``` javascript
var socketColorsChance = require('socket-colors-chance');
```

### `socketColorsChance(opts)`

Given `opts`, an _Object_, returns the probability of rolling the desired socket
colors as a _Number_.

  - `opts.sockets`: number of sockets
  - `opts.strength`: strength requirement
  - `opts.dexterity`: dexterity requirement
  - `opts.intelligence`: intelligence requirement
  - `opts.red`: desired number of red sockets
  - `opts.green`: desired number of green sockets
  - `opts.blue`: desired number of blue sockets

`opts.sockets` and at least one of `opts.{red,green,blue}` are the only required
parameters.


   [poe]: https://www.pathofexile.com/
   [chromatic]: https://github.com/KenanY/chromatic-orb
   [vorici]: http://pathofexile.gamepedia.com/Vorici,_Master_Assassin
   [siveran]: https://github.com/Siveran/siveran.github.io
   [lawphill]: http://shouldichromeit.herokuapp.com/howitworks
