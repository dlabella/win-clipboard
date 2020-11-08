# win-clipboard [![NPM version][npm-image]][npm-url] [![Build Status][appveyor-image]][appveyor-url] [![Dependency Status][daviddm-image]][daviddm-url]

This source code is based on Marek Lewandowski https://github.com/mlewand/win-clipboard

An experimental Node.js module that provides you a full control over host clipboard in Windows environment.

## Installation

If you haven't ever messed up with C++ addons, you'll have most likely to install `windows-build-tools`. It takes a fair amount of time to complete, but simplifies the installation by **a lot**.

```sh
npm install --global --production windows-build-tools
```

Once you have the above, it's as simple as:

```sh
npm install --save-optional win-clipboard
```

Note that you should install this package an optional dependency, as it won't work on other OSes.

[standard formats builtins](https://msdn.microsoft.com/pl-pl/library/windows/desktop/ff729168(v=vs.85).

## API

```js
const clipboard = require( 'win-clipboard' );

clipboard.getFormat(); 
/*
returns: the clipboard data format in unicode string.
*/

clipboard.containsText(); 
/*
returns: if clipboard data is text 1 else 0;
*/

clipboard.containsImage(); 
/*
returns: if clipboard data is bitmap 1 else 0;
*/

clipboard.getText(format, encoding); 
/*
format: (optional) clipoard text format. if null 'CF_UNICODETEXT' is default value;
encoding: (optional) text encoding, if null 'utf-8' is default value
returns: the clipboard data as text
*/

clipboard.setText(text, format, encoding); 
/*
text: Text to store in clipboard,
format: (optional) clipboard format, if null 'CF_UNICODETEXT' is default value,
encoding: (optional) text encoding, if null 'utf-8' is default value
*/

clipboard.getImage(format); //Returns the clipboard image data as byteArray
/*
format: (optional) clipoard text format. if null 'CF_UNICODETEXT' is default value;
returns: Buffer (https://nodejs.org/api/buffer.html) - A raw buffer of what is kept in the memory.
*/

clipboard.setImage(arrayBuffer, format);
/*
arrayBuffer: ArrayBuffer with image data (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) - Raw data to be set.
format: (optional) clipoard image format. if null 'CF_DIBV5' is default value;
*/

```

## API

* `getText( [format, encoding] )`
  * Params:
    * `format` - `string` - Format name you want to set. Could be one of the [standard builtins](https://msdn.microsoft.com/pl-pl/library/windows/desktop/ff729168(v=vs.85).aspx). Examples are `CF_UNICODETEXT`, `CF_TEXT`, `HTML Format` etc. Defaults to `CF_UNICODETEXT`.
    * `encoding` - `string` - Encoding used for decoding string in the clipboard. Defaults to `utf-16le`.
  * Returns:
    * `string` - String retrieved from the clipboard.
    * `null` - If no data was found.
* `setText( newText[, format, encoding] )`
  * Params:
    * `newText` - `string` - Text to be set in the clipboard.
    * `format` - `string` - Format name you want to set. Could be one of the [standard builtins](https://msdn.microsoft.com/pl-pl/library/windows/desktop/ff729168(v=vs.85).aspx). Examples are `CF_UNICODETEXT`, `CF_TEXT`, `HTML Format` etc. Defaults to `CF_UNICODETEXT`.
    * `encoding` - `string` - Encoding used for encoding string into the clipboard. Default value depends on format:
      * `CF_TEXT` - Defaults to `ascii`.
      * `CF_UNICODETEXT` - Defaults to `utf-16le`.
      * In any other case defaults to `utf8`.
  * Returns:
    * `number` - Number of bytes written if successful.
    * `null` - If failed.
* `getHTML( [fullHtml, format] )`
  * Params:
    * `fullHtml` - `boolean` - If set to `true` will return outer context, like `html`, `body` tags. Defaults to `false`.
    * `format` - `string` - Format name you want to set. Could be one of the [standard builtins](https://msdn.microsoft.com/pl-pl/library/windows/desktop/ff729168(v=vs.85).aspx). Examples are `CF_UNICODETEXT`, `CF_TEXT`, `HTML Format` etc.
* `setHTML( newHtml, [sourceUrl, format] )`
  * Params:
    * `newHtml` - `string` - HTML code to be set.
    * `sourceUrl` - `string` - URL to be set as a SourceURL header. Defaults to `null`.
    * `format` - `string` - Format name you want to set. Could be one of the [standard builtins](https://msdn.microsoft.com/pl-pl/library/windows/desktop/ff729168(v=vs.85).aspx). Examples are `CF_UNICODETEXT`, `CF_TEXT`, `HTML Format` etc.
* `getData( format )`
  * Params:
    * `format` - `string` - Format name you want to set. Could be one of the [standard builtins](https://msdn.microsoft.com/pl-pl/library/windows/desktop/ff729168(v=vs.85).aspx). Examples are `CF_UNICODETEXT`, `CF_TEXT`, `HTML Format` etc.
  * Returns:
    * [`Buffer`](https://nodejs.org/api/buffer.html) - A raw buffer of what is kept in the memory.
    * `null` - If nothing is found.
* `setData( newData, format )` - Sets raw data to a given clipboard format.
  * Params:
    * `newData` - [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) - Raw data to be set.
    * `format` - `string` - Format name you want to set. Could be one of the [standard builtins](https://msdn.microsoft.com/pl-pl/library/windows/desktop/ff729168(v=vs.85).aspx). Examples are `CF_UNICODETEXT`, `CF_TEXT`, `HTML Format` etc.
  * Returns:
    * `number` - Number of bytes written if successful.
    * `null` - If failed.
* `getFormats`
  * Returns:
    * `string[]` - An array of strings with available formats.
* `clear` - Simply wipes out your clipboard.

## Why?

I needed to put some fancy stuff into a clipboard, and I was surprised that there's no good library for managing the clipboard.

What I needed was an ability to set HTML / RTF / plain text together, which was nowhere to be found.

Other requirement that I had in other side project, was retrieve all the formats in clipboard, for a further inspection.

All the implementation allowed just for setting a plaintext - it was due to the fact that it was based on `clip` bin.

## How?

I implemented it using a Node.js C++ addon, which uses WinAPI.

The implementation turned out to be extremely easy, while having access to the WinAPI it gives all the power in the world to work with the clipboard.

## License

MIT © [Marek Lewandowski]()


[npm-image]: https://badge.fury.io/js/win-clipboard.svg
[npm-url]: https://npmjs.org/package/win-clipboard
[appveyor-image]: https://ci.appveyor.com/api/projects/status/sbvv75y2edldsktq?svg=true&passingText=master%20%E2%9C%93
[appveyor-url]: https://ci.appveyor.com/project/mlewand/win-clipboard
[daviddm-image]: https://david-dm.org/mlewand/win-clipboard.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mlewand/win-clipboard
