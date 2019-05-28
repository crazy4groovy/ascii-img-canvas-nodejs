import validateArgs from './validate-args'
import imgToAscii from '.'

async function main() {
  const args = process.argv.slice(2)
  const [
    url,
    ...opts
  ] = args

  if (!url) {
    console.log('run: ascii-img {image-path} {options?}')
  }

  const options = opts.reduce((map, arg) => {
    const [k, v] = arg.replace(/^--?/, '').split('=')
    if (validateArgs[k]) {
      map[k] = validateArgs[k](v)
    }

    return map
  }, {})

  const asciiImgHosted = await imgToAscii(url, options).catch(console.log)

  console.log(asciiImgHosted)
}

main()
