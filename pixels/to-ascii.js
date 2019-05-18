const defaultCharList = ' .,:;i1tfLCG08@'
const defaultColorCharList = ' CGO08@'

const swapHtmlChars = {
  ' ': '&nbsp;'
}

function rgbStr(r, g, b) {
  return 'rgb(' + [r, g, b].join(',') + ');'
}

export function toAscii({chars, isInvert, isHtmlColor, isBlock, isAlpha}) {
  const charList = (chars ||
    (isHtmlColor ? defaultColorCharList : defaultCharList)).split('')

  let asciiChars = ''

  function pixel(aPixel) {
    const [r, g, b] = aPixel

    if (aPixel.length === 0) {
      asciiChars += (isHtmlColor ? '<br/>' : '\n')
      return
    }

    const brightness = ((0.3 * r) + (0.59 * g) + (0.11 * b)) / 255
    let charIdx = (charList.length - 1) - Math.round(brightness * (charList.length - 1))

    if (isInvert) {
      charIdx = (charList.length - 1) - charIdx
    }

    let char = charList[charIdx]
    if (isHtmlColor && swapHtmlChars[char]) {
      char = swapHtmlChars[char]
    }

    asciiChars += formatHtmlChar(char, aPixel)
  }

  function pixels(asciiPixels) {
    asciiPixels.forEach(row => {
      row.forEach(aPixel => {
        pixel(aPixel)
      })
      pixel([])
    })
    return getAsciiChars()
  }

  function formatHtmlChar(char, [r, g, b, a]) {
    return isHtmlColor ?
      '<span style=\'color:' + rgbStr(r, g, b) + ';' +
      (isBlock ? ('background-color:' + rgbStr(r, g, b) + ';') : '') +
      (isAlpha ? ('opacity:' + (a / 255) + ';') : '') + '\'>' +
      char + '</span>' :
      char
  }

  function getAsciiChars(value) {
    if (value) {
      asciiChars = value
    } else {
      return asciiChars
    }
  }

  return {
    asciiChars: getAsciiChars,
    pixel,
    pixels
  }
}
