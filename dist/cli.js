
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
    const asciiImgHosted = yield imgToAscii(img, opts).catch(console.log);
    console.log(asciiImgHosted);
  });

  return function main() {
    return _ref.apply(this, arguments);
  };
})();

const imgToAscii = require('.');

main();

module.exports = main;
