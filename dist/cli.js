#!/usr/bin/env node
'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var _require = require('canvas');

const createCanvas = _require.createCanvas,
      loadImage = _require.loadImage;
let fromCanvas = (() => {
  var _ref = _asyncToGenerator(function* (imgSrc, width, height, next) {
    const canvasImg = yield loadImage(imgSrc);
    const canvas = createCanvas(width, height);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(canvasImg, 0, 0, width, height);
    const imgData = ctx.getImageData(0, 0, width, height).data;
    const asciiPixels = [];
    let row;

    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x++) {
        const offset = (y * width + x) * 4;
        const r = imgData[offset];
        const g = imgData[offset + 1];
        const b = imgData[offset + 2];
        const a = imgData[offset + 3];
        const aPixel = [r, g, b, a];

        if (x === 0) {
          row = [];

          if (next) {
            next(row);
          } else {
            asciiPixels.push(row);
          }
        }

        if (next) {
          next(aPixel);
        } else {
          row.push(aPixel);
        }
      }
    }

    return asciiPixels;
  });

  return function fromCanvas(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

const defaultCharList = ' .,:;i1tfLCG08@';
const defaultColorCharList = ' CGO08@';
const swapHtmlChars = {
  ' ': '&nbsp;'
};

function rgbStr(r, g, b) {
  return 'rgb(' + [r, g, b].join(',') + ');';
}

function toAscii({
  chars,
  isInvert,
  isHtmlColor,
  isBlock,
  isAlpha
}) {
  const charList = (chars || (isHtmlColor ? defaultColorCharList : defaultCharList)).split('');
  let asciiChars = '';

  function pixel(aPixel) {
    var _aPixel = _slicedToArray(aPixel, 3);

    const r = _aPixel[0],
          g = _aPixel[1],
          b = _aPixel[2];

    if (aPixel.length === 0) {
      asciiChars += isHtmlColor ? '<br/>' : '\n';
      return;
    }

    const brightness = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
    let charIdx = charList.length - 1 - Math.round(brightness * (charList.length - 1));

    if (isInvert) {
      charIdx = charList.length - 1 - charIdx;
    }

    let char = charList[charIdx];

    if (isHtmlColor && swapHtmlChars[char]) {
      char = swapHtmlChars[char];
    }

    asciiChars += formatHtmlChar(char, aPixel);
  }

  function pixels(asciiPixels) {
    asciiPixels.forEach(row => {
      row.forEach(aPixel => {
        pixel(aPixel);
      });
      pixel([]);
    });
    return getAsciiChars();
  }

  function formatHtmlChar(char, [r, g, b, a]) {
    return isHtmlColor ? '<span style=\'color:' + rgbStr(r, g, b) + ';' + (isBlock ? 'background-color:' + rgbStr(r, g, b) + ';' : '') + (isAlpha ? 'opacity:' + a / 255 + ';' : '') + '\'>' + char + '</span>' : char;
  }

  function getAsciiChars(value) {
    if (value) {
      asciiChars = value;
    } else {
      return asciiChars;
    }
  }

  return {
    asciiChars: getAsciiChars,
    pixel,
    pixels
  };
}

let asciiImgCanvasNodejs = (() => {
  var _ref = _asyncToGenerator(function* (imgSrc, opts = {}) {
    if (!imgSrc || typeof imgSrc !== 'string') {
      throw new TypeError('Invalid image source value: ' + imgSrc);
    }

    if (typeof opts !== 'object') {
      throw new TypeError('Invalid options: ' + opts);
    }

    const chars = opts.chars || null;
    const isAlpha = opts.alpha === true;
    const isBlock = opts.block === true;
    const isHtmlColor = opts.htmlColor === true;
    const isInvert = opts.invert === true;
    const isStream = opts.stream !== false;
    const height = opts.height || 200;
    const width = opts.width || 200;
    const asciiInstance = toAscii({
      chars,
      isInvert,
      isHtmlColor,
      isBlock,
      isAlpha
    });

    if (isStream) {
      yield fromCanvas(imgSrc, width, height, asciiInstance.pixel);
      return asciiInstance.asciiChars();
    }

    const pixels = yield fromCanvas(imgSrc, width, height);
    return asciiInstance.pixels(pixels);
  });

  return function asciiImgCanvasNodejs(_x) {
    return _ref.apply(this, arguments);
  };
})();

let main = (() => {
  var _ref = _asyncToGenerator(function* () {
    console.log('run: ascii-img <image-path> <width?> <height?>');
    const args = process.argv.slice(2);

    var _args = _slicedToArray(args, 3);

    const img = _args[0];
    var _args$ = _args[1];
    const width = _args$ === undefined ? '100' : _args$;
    var _args$2 = _args[2];
    const height = _args$2 === undefined ? '100' : _args$2;
    const opts = {
      height: Number(height),
      width: Number(width)
    };
    const asciiImgHosted = yield asciiImgCanvasNodejs(img, opts).catch(console.log);
    console.log(asciiImgHosted);
  });

  return function main() {
    return _ref.apply(this, arguments);
  };
})();
main();

module.exports = main;
