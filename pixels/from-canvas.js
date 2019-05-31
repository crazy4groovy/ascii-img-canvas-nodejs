const {createCanvas, loadImage} = require('canvas')

export async function fromCanvas(imgSrc, width, height, next) {
  const canvasImg = await loadImage(imgSrc)

  const canvas = createCanvas(width, height)
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(canvasImg, 0, 0, width, height)
  const imgData = ctx.getImageData(0, 0, width, height).data

  const asciiPixels = []
  let row
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x++) {
      const offset = ((y * width) + x) * 4
      const r = imgData[offset]
      const g = imgData[offset + 1]
      const b = imgData[offset + 2]
      const a = imgData[offset + 3]
      const aPixel = [r, g, b, a]

      if (x === 0) {
        row = []
        if (next) {
          next(row)
        } else {
          asciiPixels.push(row)
        }
      }

      if (next) {
        next(aPixel)
      } else {
        row.push(aPixel)
      }
    }
  }

  return asciiPixels
}
