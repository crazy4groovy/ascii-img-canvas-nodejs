const fromCanvas = require('./pixels/from-canvas')
const toAscii = require('./pixels/to-ascii')

async function asciifyImageSrc(imgSrc, opts) {
  const chars = opts.chars || null
  const isAlpha = (opts.alpha === true)
  const isBlock = (opts.block === true)
  const isHtmlColor = (opts.htmlColor === true)
  const isInvert = (opts.invert === true)
  const isStream = (opts.stream === true)

  const width = opts.width || 200
  const height = opts.height || 200

  if (isStream) {
    const asciiInstance = toAscii({chars, isInvert, isHtmlColor, isBlock, isAlpha})
    await fromCanvas(imgSrc, width, height, asciiInstance.pixel)
    const asciiChars = asciiInstance.asciiChars()
    return asciiChars
  }

  const pixels = await fromCanvas(imgSrc, width, height)
  const asciiChars = toAscii({chars, isInvert, isHtmlColor, isBlock, isAlpha}).pixels(pixels)
  return asciiChars
}

module.exports = asciifyImageSrc
