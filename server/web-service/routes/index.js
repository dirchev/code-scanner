const errorsResponder = require('./errorResponder')
const defaultResponder = require('./defaultResponder')
const loadRouteConstructor = require('./loadRouteConstructor')
const FileService = require('../lib/file-service')
const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:3000',
}

let routes = function ({app, models = {}}) {
  let apiHelpers = {
    fileService: new FileService({url: 'http://localhost:8081'}),
    cors: cors(corsOptions)
  }
  app.use(apiHelpers.cors)
  let loadRoute = loadRouteConstructor(app, {models, apiHelpers})

  // loadRoute('get', '/',  require('./api/base'))
  loadRoute('post', '/login', require('./api/login'))
  loadRoute('post', '/upload', require('./api/upload'))

  app.use(defaultResponder)
  app.use(errorsResponder)
}

module.exports = routes
