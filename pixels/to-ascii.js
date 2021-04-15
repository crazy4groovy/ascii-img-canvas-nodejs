const defaultCharList = ' .,:;i1tfLCG08@'
const defaultColorCharList = ' CGO08@'

const convertHtmlChars = {
  ' ': '&nbsp;'
}

const rgbHtmlString = (r, g, b) => 'rgb(' + [r, g, b].join(',') + ');'

export function toAscii({chars, isInvert, isHtmlColor, isBlock, isOpacity, isRaw}) {
  let asciiChars = []
  const charList = (chars ||
    (isHtmlColor ? defaultColorCharList : defaultCharList)).split('')

  function pixel(aPixel) {
    if (aPixel.length === 0) {
      if (asciiChars.length === 0) {
        return
      }

      asciiChars.push(isHtmlColor ? '<br/>' : (isRaw ? ['', []] : '\n'))
      return
    }

    const [r, g, b] = aPixel

    const brightness = ((0.3 * r) + (0.59 * g) + (0.11 * b)) / 255
    let charIdx = (charList.length - 1) - Math.round(brightness * (charList.length - 1))

    if (isInvert) {
      charIdx = (charList.length - 1) - charIdx
    }

    let char = charList[charIdx]
    if (isHtmlColor && convertHtmlChars[char]) {
      char = convertHtmlChars[char]
    }

    const theChar = formatHtmlColor(char, aPixel) || formatRaw(char, aPixel) || char
    asciiChars.push(theChar)
  }

  function pixels(asciiPixels) {
    for (const row of asciiPixels) {
      for (const aPixel of row) {
        pixel(aPixel)
      }

      pixel([])
    }

    return getAsciiChars()
  }

  function formatHtmlColor(char, [r, g, b, a]) {
    if (!isHtmlColor) {
      return
    }

    return '<span style=\'color:' + rgbHtmlString(r, g, b) +
      (isBlock ? ('background-color:' + rgbHtmlString(r, g, b)) : '') +
      (isOpacity ? ('opacity:' + (a / 255) + ';') : '') + '\'>' +
      char + '</span>'
  }

  function formatRaw(char, [r, g, b, a]) {
    if (!isRaw) {
      return
    }

    return ([char, [r, g, b, a]])
  }

  function getAsciiChars(newArray) {
    if (Array.isArray(newArray)) {
      asciiChars = newArray
      return
    }

    if (isRaw) {
      return JSON.stringify(asciiChars)
    }

    return asciiChars.join('')
  }

  return {
    asciiChars: getAsciiChars,
    pixel,
    pixels
  }
}
