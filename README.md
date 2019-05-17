# ascii-img-canvas-nodejs

## What Can This Do

Convert any image into ASCII in NodeJS

Note: This lib relies on the lib [canvas](https://www.npmjs.com/package/canvas), which has some **very heavy** [compiling](https://www.npmjs.com/package/canvas#compiling) requirements. Please check to see if/how your machine's OS is supported. (I recommend Ubuntu.)

## Install

`npm install ascii-img-canvas-nodejs`

## Use

```javascript
const imgToAscii = require('ascii-img-canvas-nodejs')

const opts = {}

const asciiImgHosted = await imgToAscii('http://example.com/image.jpg', opts)
console.log(asciiImgHosted)

const asciiImgLocal = await imgToAscii('images/face.jpg', opts)
console.log(asciiImgLocal)
```

## Options

- .alpha = `false`
- .block = `false`
- .chars = `' .,:;i1tfLCG08@'`
- .htmlColor = `false`
- .invert = `false`
- .width = `200`
- .height = `200`
