# ascii-img-canvas-nodejs

## Overview

Convert almost any image into ASCII in NodeJS.

Note: This lib depends on [canvas](https://www.npmjs.com/package/canvas), which has some **very heavy** [compiling](https://www.npmjs.com/package/canvas#compiling) requirements. Please check to see if/how your machine's OS is supported. (I recommend Ubuntu.)

## Install

`npm install ascii-img-canvas-nodejs`

## Usage (lib)

```javascript
const imgToAscii = require('ascii-img-canvas-nodejs')

const opts = {}

const asciiImgHosted = await imgToAscii('http://example.com/image.jpg', opts)
console.log(asciiImgHosted)

const asciiImgLocal = await imgToAscii('images/face.jpg', opts)
console.log(asciiImgLocal)
```

## Options

- .alpha = `false`  (* .htmlColor)
- .block = `false`  (* .htmlColor)
- .chars = `' .,:;i1tfLCG08@'`
- .htmlColor = `false` *
- .invert = `false` (light <==> dark)
- .width = `200`
- .height = `200`

## Usage (cli)

`npm install -g ascii-img-canvas-nodejs`

`ascii-img <image-path> <width?> <height?>`

## Usage (HTTP)

server:

`npm install -g ascii-img-canvas-nodejs`

`ascii-img-server <port?> <ip?>`

client:

- single image: `GET /img?url=http://url1&{options}`
- multiple images: `POST /imgs?{options} ; body of content-type "application/json" ===> ["url1", ...]`
