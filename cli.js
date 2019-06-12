import validateArgs from './validate-args'
import dir from './dir'
import imgToAscii from '.'

const fs = require('fs')

function formatOutput(ascii, filename) {
  let output = []
  if (filename) {
    output.push('FILENAME=' + filename + ':')
  }

  output.push(ascii)

  if (filename) {
    output.push('[EOF]')
  }

  output = output.join('\n')
  return output
}

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

  const handleSrc = async filename => {
    if (!filename.match(/\.(jpe?g|png|svg)$/i)) {
      return
    }

    const ascii = await imgToAscii(filename, options).catch(console.log)

    const formatFilename = writeFileWithTag ? undefined : filename
    const output = formatOutput(ascii, formatFilename)

    if (!writeFileWithTag) {
      console.log(output)
      return
    }

    fs.writeFileSync(`${filename}.${writeFileWithTag}`, output, 'utf-8')
  }

  if (dir.dirExists(url)) {
    await dir.scan(url, handleSrc)
  } else {
    handleSrc(url)
  }
}

main()
