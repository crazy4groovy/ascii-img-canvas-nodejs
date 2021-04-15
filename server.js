import validateArgs from './validate-args'
import imgToAscii from '.'

require('dotenv').config()

const cors = require('cors')()
const compression = require('compression')()
const fastify = require('fastify')({
  logger: process.env.SERVER_LOG || false
})

const [_port, _ip] = process.argv.slice(2)

function queryToOptions(query) {
  return Object.keys(query).reduce((map, key) => {
    if (validateArgs[key]) {
      map[key] = validateArgs[key](query[key])
    }

    return map
  }, {})
}

const postOptions = Object.freeze({
  schema: {
    body: {
      type: 'array'
    }
  }
})

fastify.use(cors)
fastify.use(compression)

fastify.get('/', () => {
  const options = Object.keys(validateArgs)
  return {
    GET: '/img?url=&' + options.join('=&') + '= >>> response of text/html ',
    POST: '/imgs=' + options.join('=&') + '= + application/json body of ["url1", "url2", "url3", ...]'
  }
})

fastify.get('/img', (request, res) => {
  const {url: img} = request.query
  const options = queryToOptions(request.query)
  res.type('text/html').code(200)
  return doGet(img, options)
})

fastify.post('/imgs', postOptions, (request, res) => {
  const options = queryToOptions(request.query)
  const {body: imgs} = request
  res.type('application/json').code(200)
  return doPost(imgs, options)
})

fastify.listen(
  Number(process.env.PORT || _port) || 3000,
  process.env.IP || _ip || '0.0.0.0',
  (error, address) => {
    if (error) {
      console.log(`START UP ERROR: ${error}`)
      throw error
    }

    console.log(`Server listening on ${address}`)
  }
)

function doGet(img, options) {
  // /console.log(img, opts)
  return imgToAscii(img, options)
}

function doPost(imgs, options) {
  // /console.log(imgs, opts)
  return Promise.all(imgs.map(img => imgToAscii(img, options)))
}
