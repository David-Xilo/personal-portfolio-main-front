const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.get('/games/intro', (req, res) => {
  res.jsonp({ message: 'Hello from games endpoint!' })
})

server.get('/games/blogs', (req, res) => {
  res.jsonp({ message: 'Hello from blogs endpoint!' })
})

server.get('/games/downloads', (req, res) => {
  res.jsonp({ message: 'Hello from downloads endpoint!' })
})

server.get('/tech/intro', (req, res) => {
  res.jsonp({ message: 'This is the Tech Intro screen.' })
})

server.get('/tech/blogs', (req, res) => {
  res.jsonp({ message: 'This is the Tech Blog screen.' })
})

server.get('/tech/studies', (req, res) => {
    res.jsonp({ message: 'This is the Tech Studies screen.' })
  })

server.get('/tech/downloads', (req, res) => {
  res.jsonp({ message: 'This is the Tech downloads screen.' })
})

server.get('/finance/intro', (req, res) => {
  res.jsonp({ message: 'This is the finance Intro screen.' })
})

server.get('/finance/blogs', (req, res) => {
  res.jsonp({ message: 'This is the finance Blog screen.' })
})

server.get('/finance/studies', (req, res) => {
  res.jsonp({ message: 'This is the finance studies screen.' })
})

server.get('/finance/analysis', (req, res) => {
  res.jsonp({ message: 'This is the finance analysis screen.' })
})

server.listen(4000, () => {
  console.log('JSON Server is running on 4000')
})