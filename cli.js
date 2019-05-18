import imgToAscii from '.'

async function main() {
  console.log('run: ascii-img <image-path> <width?> <height?>')

  const args = process.argv.slice(2)
  const [
    img,
    width = '100',
    height = '100'
  ] = args
  const opts = {height: Number(height), width: Number(width)}

  const asciiImgHosted = await imgToAscii(img, opts).catch(console.log)

  console.log(asciiImgHosted)
}

main()
