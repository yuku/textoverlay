Simple Decorator for Textarea
=============================

[Demo](http://yuku-t.com/jquery-overlay)

How to Use
----------

```js
$('textarea').overlay(strategies);
```

`strategies` MUST an Array of Object.

```js
strategies = [strategy];
```

Each `strategy` MUST have `match` and `css` properties.

```js
strategy = {
  match: matchObject,
  css: cssObject
};
```

`matchObject` MUST be a RegExp, a String or an Array of String. When it is a RegExp, it SHOULD include 'g' flag.

```js
matchObject = 'abc';  // every 'abc' match
matchobject = ['a', 'b', 'c'];  // every 'a' 'b' and 'c' match
matchObject = /\B@\w+/g; // every words start with @ match
```

`cssObject` MUST be a Object. Currently 'background-color' is only available.

```js
cssObject = {
  'background-color': 'glay',
  color: 'red'  // ignored
};
```

Todo
----

- Auto resizing textarea

License
-------

Licensed under the MIT License
