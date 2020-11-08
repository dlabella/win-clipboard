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

## Why?

I needed to put some fancy stuff into a clipboard, and I was surprised that there's no good library for managing the clipboard.

What I needed was an ability to set HTML / RTF / plain text / Image, etc..

Other requirement that I had in other side project, was retrieve all the formats in clipboard, for a further inspection.

All the implementation allowed just for setting a plaintext - it was due to the fact that it was based on `clip` bin.

## How?

Marek Lewandowski https://github.com/mlewand/win-clipboard had implemented this, i only did simple adaptations to get this module works on node 15.

## License

MIT © [Marek Lewandowski]()