import dir from './dir'

const {promisify} = require('util')
const {URL} = require('url')
const http = require('http')
const https = require('https')
const sizeOf = require('image-size')

export default async imgSrc => {
  if (dir.fileExists(imgSrc)) {
    return promisify(sizeOf)(imgSrc)
  }

  const options = new URL(imgSrc)

  return new Promise(resolve => {
    const prot = imgSrc.startsWith('https:') ? https : http
    prot.get(options, response => {
      const chunks = []
      response
        .on('data', chunk => {
          chunks.push(chunk)
        }).on('end', () => {
          const buffer = Buffer.concat(chunks)
          resolve(sizeOf(buffer))
        })
    })
  })
}
