const fromCanvas = require('./pixels/from-canvas')
const toAscii = require('./pixels/to-ascii')

async function asciifyImageSrc(imgSrc, opts) {
  const isHtmlColor = (opts.htmlColor === true)
  const isAlpha = (opts.alpha === true)
  const isBlock = (opts.block === true)
  const isInvert = (opts.invert === true)
  const chars = opts.chars || null

  const width = opts.width || 200
  const height = opts.height || 200

  const pixels = await fromCanvas(imgSrc, width, height)
  const asciiStr = toAscii({chars, isInvert, isHtmlColor, isBlock, isAlpha}).pixels(pixels)
  return asciiStr
}

module.exports = asciifyImageSrc
