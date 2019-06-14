import {fromCanvas} from './pixels/from-canvas'
import {toAscii} from './pixels/to-ascii'
import dimensions from './dimensions'

const defaultWidth = 100

async function calcDimensions({width, height}, imgSrc) {
  if (width && height) {
    return {width, height}
  }

  let w = width
  let h = height
  const dim = await dimensions(imgSrc)

  if (!w && !h) {
    w = defaultWidth
  }

  if (w) {
    const ratio = dim.width / w
    h = Math.round(dim.height / ratio)
  } else {
    const ratio = dim.height / h
    w = Math.round(dim.width / ratio)
  }

  return {width: w, height: h}
}

async function asciiImgCanvasNodejs(imgSrc, opts = {}) {
  if (!imgSrc || typeof imgSrc !== 'string') {
    throw new TypeError('Invalid image source value: ' + imgSrc)
  }

  if (typeof opts !== 'object') {
    throw new TypeError('Invalid options: ' + opts)
  }

  const chars = opts.chars || null
  const isOpacity = (opts.opacity === true)
  const isBlock = (opts.block === true)
  const isHtmlColor = (opts.htmlColor === true)
  const isInvert = (opts.invert === true)
  const isRaw = (opts.raw === true)
  const isStream = (opts.stream !== false)

  const {width, height} = await calcDimensions(opts, imgSrc)

  const asciiInstance = toAscii({chars, isInvert, isBlock, isOpacity, isHtmlColor, isRaw})

  if (isStream) {
    await fromCanvas(imgSrc, width, height, asciiInstance.pixel)
    return asciiInstance.asciiChars()
  }

  const pixels = await fromCanvas(imgSrc, width, height)
  return asciiInstance.pixels(pixels)
}

export default asciiImgCanvasNodejs
