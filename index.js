import {fromCanvas} from './pixels/from-canvas'
import {toAscii} from './pixels/to-ascii'
import dimensions from './dimensions'

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

  const height = opts.height || 150

  let {width} = opts
  if (width === undefined) {
    // Calculate width via height's ratio
    const dim = await dimensions(imgSrc)
    const ratio = dim.height / height
    width = Math.round(dim.width / ratio)
  } else {
    width = width || height
  }

  const asciiInstance = toAscii({chars, isInvert, isBlock, isOpacity, isHtmlColor, isRaw})

  if (isStream) {
    await fromCanvas(imgSrc, width, height, asciiInstance.pixel)
    return asciiInstance.asciiChars()
  }

  const pixels = await fromCanvas(imgSrc, width, height)
  return asciiInstance.pixels(pixels)
}

export default asciiImgCanvasNodejs
