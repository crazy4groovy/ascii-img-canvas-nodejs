import validateArgs from './validate-args'
import dir from './cli-dir'
import imgToAscii from '.'

const fs = require('fs')

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

  const {writeFileWithTag} = options

  let srcs
  if (dir.dirExists(url)) {
    srcs = dir.scan(url).filter(file => file.match(/\.(jpe?g|png|svg)$/i))
  } else {
    srcs = [url]
  }

  const asciis = await Promise.all(srcs.map(async src => imgToAscii(src, options).catch(console.log)))

  if (srcs.length === 1) {
    console.log(asciis[0])
    return
  }

  if (writeFileWithTag === undefined) {
    console.log(asciis.reduce((map, ascii, i) => {
      map.push(ascii)
      map.push('\nFILENAME=' + srcs[i] + ':')
      return map
    }, []).join('\n'))
    return
  }

  asciis.forEach((ascii, i) => {
    fs.writeFileSync(`${srcs[i]}.${writeFileWithTag}`, ascii, 'utf-8')
  })
}

main()
