# @breadcrum/bookmarklet
[![Actions Status](https://github.com/hifiwi-fi/bc-bookmarklet/workflows/tests/badge.svg)](https://github.com/hifiwi-fi/bc-bookmarklet/actions)
[![latest version](https://img.shields.io/npm/v/@breadcrum/bookmarklet.svg)](https://www.npmjs.com/package/@breadcrum/bookmarklet)
[![Coverage Status](https://coveralls.io/repos/github/hifiwi-fi/bc-bookmarklet/badge.svg?branch=master)](https://coveralls.io/github/hifiwi-fi/bc-bookmarklet?branch=master)


This is the bookmarklet for Breadcrum.net.

```
npm install bookmarklet
```

## Usage

``` js
import getBookmarklet from '@breadcrum/bookmarklet'

const bookmarkletText = getBookmarklet({
  TARGET_URL: 'breadcrum.net',
  WINDOW_TITLE: 'Breadcrum'
})
```

Returns the bookmarklet text with simple runtime customizations so that environments can fix hard-coded variables.

## How this works

`esbuild` used used to build standard, modular esm code into a minified `iffi` target, and then the results are stored in a json document that gets customised with `.replaceAll` in the exported `getBookmarklet` function.

## See also

This bookmarklet was based off of the following resources:

- [joelcarranza/particular-pinboard](https://github.com/joelcarranza/particular-pinboard)


## License

MIT
