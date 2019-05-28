import validateArgs from './validate-args'
import imgToAscii from '.'

require('dotenv').config()

const cors = require('cors')()
const fastify = require('fastify')({
  logger: process.env.SERVER_LOG || false
})

const [_port, _ip] = process.argv.slice(2)

function queryToOpts(query) {
  return Object.keys(query).reduce((map, key) => {
    if (validateArgs[key]) {
      map[key] = validateArgs[key](query[key])
    }

    return map
  }, {})
}

const postOpts = Object.freeze({
  schema: {
    body: {
      type: 'array'
    }
  }
})

fastify.use(cors)

fastify.get('/', () => {
  const opts = Object.keys(validateArgs)
  return {
    GET: '/img?url=&' + opts.join('=&') + '= >>> response of text/html ',
    POST: '/imgs=' + opts.join('=&') + '= + application/json body of ["url1", "url2", "url3", ...]'
  }
})

fastify.get('/img', (req, res) => {
  const {url: img} = req.query
  const opts = queryToOpts(req.query)
  res.type('text/html').code(200)
  return doGet(img, opts)
})

fastify.post('/imgs', postOpts, (req, res) => {
  const opts = queryToOpts(req.query)
  const {body: imgs} = req
  res.type('application/json').code(200)
  return doPost(imgs, opts)
})

fastify.listen(
  Number(process.env.PORT || _port) || 3000,
  process.env.IP || _ip || '0.0.0.0',
  (err, address) => {
    if (err) {
      console.log(`START UP ERROR: ${err}`)
      throw err
    }

    console.log(`Server listening on ${address}`)
  }
)

function doGet(img, opts) {
  // /console.log(img, opts)
  return imgToAscii(img, opts)
}

function doPost(imgs, opts) {
  // /console.log(imgs, opts)
  return Promise.all(imgs.map(img => imgToAscii(img, opts)))
}
