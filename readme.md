jsxt
====

like xslt but js(x)

`npm install jsxt`

usage
-----

### defining a transform

```js
/** @jsx element */
import {element, match} from 'jsxt';

export const toUpper = match('upper', ({node}) => <h1>{node.text().toUpperCase()}</h1>);
```

### transforming HTML

```js
import transform from 'jsxt';
import * as transforms from './transform';

transform('<upper>asdf</upper>', transforms); //=> '<h1>ASDF</h1>'
```

transform api
-------------

### `match(selector, replacer)`

Takes a Cheerio selector, and replaces any matching elements with the element generated by the `replacer`. The replacer is a function that should return a Cheerio element, and is called with an object containing the following:

#### `node`

The matched element, as a Cheerio object.

#### `select`

A convenience function for `node.find`.

#### `apply`

Similar to `xsl:apply-templates`, a function that outputs the transformed children of the node.

jsx
---

`jsxt.element` is available as a jsx target that outputs a cheerio element. Import it and use the jsx pragma `/** @jsx element */` or pass `{pragma: 'element'}` as an option to `transform-react-jsx`.

licence
-------

MIT
