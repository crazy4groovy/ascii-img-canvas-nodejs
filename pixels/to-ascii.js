const defaultCharList = ' .,:;i1tfLCG08@'
const defaultColorCharList = ' CGO08@'

const swapHtmlChars = {
  ' ': '&nbsp;'
}

function rgbStr(r, g, b) {
  return 'rgb(' + [r, g, b].join(',') + ');'
}

function toChar(aPixel, {charList, isInvert, isHtmlColor, isBlock, isAlpha}) {
  const [r, g, b, a] = aPixel

  if (!(r || g || b || a)) {
    return (isHtmlColor ? '<br/>' : '\n')
  }

  const brightness = ((0.3 * r) + (0.59 * g) + (0.11 * b)) / 255
  let charIdx = (charList.length - 1) - Math.round(brightness * (charList.length - 1))

  if (isInvert) {
    charIdx = (charList.length - 1) - charIdx
  }

  let strThisChar = charList[charIdx]
  if (isHtmlColor && swapHtmlChars[strThisChar]) {
    strThisChar = swapHtmlChars[strThisChar]
  }

  return isHtmlColor ?
    '<span style=\'color:' + rgbStr(r, g, b) + ';' +
    (isBlock ? ('background-color:' + rgbStr(r, g, b) + ';') : '') +
    (isAlpha ? ('opacity:' + (a / 255) + ';') : '') + '\'>' +
    strThisChar + '</span>' :
    strThisChar
}

function toAscii(asciiPixels, {chars, isInvert, isHtmlColor, isBlock, isAlpha}) {
  const charList = (chars ||
	(isHtmlColor ? defaultColorCharList : defaultCharList)).split('')
  let strChars = ''
  asciiPixels.forEach(row => {
    row.forEach(aPixel => {
      strChars += toChar(aPixel, {charList, isInvert, isHtmlColor, isBlock, isAlpha})
    })
    strChars += toChar([], {charList, isInvert, isHtmlColor, isBlock, isAlpha})
  })
  return strChars
}

module.exports = toAscii
