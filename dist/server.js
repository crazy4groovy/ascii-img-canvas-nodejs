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

var validateArgs = {
  block: Boolean,
  chars: String,
  height: Number,
  htmlColor: Boolean,
  invert: Boolean,
  opacity: Boolean,
  raw: Boolean,
  width: Number
};

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
const convertHtmlChars = {
  ' ': '&nbsp;'
};

function rgbHtmlStr(r, g, b) {
  return 'rgb(' + [r, g, b].join(',') + ');';
}

function toAscii({
  chars,
  isInvert,
  isHtmlColor,
  isBlock,
  isOpacity,
  isRaw
}) {
  let asciiChars = [];
  const charList = (chars || (isHtmlColor ? defaultColorCharList : defaultCharList)).split('');

  function pixel(aPixel) {
    var _aPixel = _slicedToArray(aPixel, 3);

    const r = _aPixel[0],
          g = _aPixel[1],
          b = _aPixel[2];

    if (aPixel.length === 0) {
      if (asciiChars.length === 0) {
        return;
      }

      asciiChars.push(isHtmlColor ? '<br/>' : isRaw ? '' : '\n');
      return;
    }

    const brightness = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
    let charIdx = charList.length - 1 - Math.round(brightness * (charList.length - 1));

    if (isInvert) {
      charIdx = charList.length - 1 - charIdx;
    }

    let char = charList[charIdx];

    if (isHtmlColor && convertHtmlChars[char]) {
      char = convertHtmlChars[char];
    }

    const theChar = formatHtmlColor(char, aPixel) || formatRaw(char, aPixel) || char;
    asciiChars.push(theChar);
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

  function formatHtmlColor(char, [r, g, b, a]) {
    if (!isHtmlColor) {
      return;
    }

    return '<span style=\'color:' + rgbHtmlStr(r, g, b) + (isBlock ? 'background-color:' + rgbHtmlStr(r, g, b) : '') + (isOpacity ? 'opacity:' + a / 255 + ';' : '') + '\'>' + char + '</span>';
  }

  function formatRaw(char, [r, g, b, a]) {
    if (!isRaw) {
      return;
    }

    return [char, [r, g, b, a]];
  }

  function getAsciiChars(newArray) {
    if (Array.isArray(newArray)) {
      asciiChars = newArray;
      return;
    }

    if (isRaw) {
      return asciiChars;
    }

    return asciiChars.join('');
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
    const isOpacity = opts.opacity === true;
    const isBlock = opts.block === true;
    const isHtmlColor = opts.htmlColor === true;
    const isInvert = opts.invert === true;
    const isRaw = opts.raw === true;
    const isStream = opts.stream !== false;
    const height = opts.height || 200;
    const width = opts.width || 200;
    const asciiInstance = toAscii({
      chars,
      isInvert,
      isBlock,
      isOpacity,
      isHtmlColor,
      isRaw
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

require('dotenv').config();

const cors = require('cors')();

const fastify = require('fastify')({
  logger: process.env.SERVER_LOG || false
});

var _process$argv$slice = process.argv.slice(2),
    _process$argv$slice2 = _slicedToArray(_process$argv$slice, 2);

const _port = _process$argv$slice2[0],
      _ip = _process$argv$slice2[1];

function queryToOpts(query) {
  return Object.keys(query).reduce((map, key) => {
    if (validateArgs[key]) {
      map[key] = validateArgs[key](query[key]);
    }

    return map;
  }, {});
}

const postOpts = Object.freeze({
  schema: {
    body: {
      type: 'array'
    }
  }
});
fastify.use(cors);
fastify.get('/', () => {
  const opts = Object.keys(validateArgs);
  return {
    GET: '/img?url=&' + opts.join('=&') + '= >>> response of text/html ',
    POST: '/imgs=' + opts.join('=&') + '= + application/json body of ["url1", "url2", "url3", ...]'
  };
});
fastify.get('/img', (req, res) => {
  const img = req.query.url;
  const opts = queryToOpts(req.query);
  res.type('text/html').code(200);
  return doGet(img, opts);
});
fastify.post('/imgs', postOpts, (req, res) => {
  const opts = queryToOpts(req.query);
  const imgs = req.body;
  res.type('application/json').code(200);
  return doPost(imgs, opts);
});
fastify.listen(Number(process.env.PORT || _port) || 3000, process.env.IP || _ip || '0.0.0.0', (err, address) => {
  if (err) {
    console.log(`START UP ERROR: ${err}`);
    throw err;
  }

  console.log(`Server listening on ${address}`);
});

function doGet(img, opts) {
  // /console.log(img, opts)
  return asciiImgCanvasNodejs(img, opts);
}

function doPost(imgs, opts) {
  // /console.log(imgs, opts)
  return Promise.all(imgs.map(img => asciiImgCanvasNodejs(img, opts)));
}
