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

async function asciiImgCanvasNodejs(imgSrc, options = {}) {
  if (!imgSrc || typeof imgSrc !== 'string') {
    throw new TypeError('Invalid image source value: ' + imgSrc)
  }

  if (typeof options !== 'object') {
    throw new TypeError('Invalid options: ' + options)
  }

  const chars = options.chars || null
  const isOpacity = (options.opacity === true)
  const isBlock = (options.block === true)
  const isHtmlColor = (options.htmlColor === true)
  const isInvert = (options.invert === true)
  const isRaw = (options.raw === true)
  const isStream = (options.stream !== false)

  const {width, height} = await calcDimensions(options, imgSrc)

  const asciiInstance = toAscii({chars, isInvert, isBlock, isOpacity, isHtmlColor, isRaw})

  if (isStream) {
    await fromCanvas(imgSrc, width, height, asciiInstance.pixel)
    return asciiInstance.asciiChars()
  }

  const pixels = await fromCanvas(imgSrc, width, height)
  return asciiInstance.pixels(pixels)
}

export default asciiImgCanvasNodejs
