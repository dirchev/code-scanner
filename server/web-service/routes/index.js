const errorsResponder = require('./errorResponder')
const defaultResponder = require('./defaultResponder')
const loadRouteConstructor = require('./loadRouteConstructor')
const FileService = require('../lib/file-service')
const CodeAnalysis = require('../lib/code-analysis')

let routes = function ({app, models = {}}) {
  let fileService = new FileService({url: 'http://localhost:8081'})
  let apiHelpers = {
    createError: function (errors, code) {
      let error = new Error('CustomError')
      error.isCodeScannerError = true
      error.code = code
      error.errors = errors
      return error
    },
    fileService: fileService,
    CodeAnalysis: new CodeAnalysis(models.CodeSubmission, fileService)
  }

  let loadRoute = loadRouteConstructor(app, {models, apiHelpers})
  loadRoute('post', '/login', require('./api/login'))
  loadRoute('post', '/register', require('./api/register'))
  loadRoute('get', '/submissions', require('./api/submissions'))
  loadRoute('get', '/submissions/:submissionId', require('./api/submission'))
  loadRoute('post', '/submissions', require('./api/create-submission'))
  loadRoute('post', '/logout', require('./api/logout'))


  app.use(defaultResponder)
  app.use(errorsResponder)
}

module.exports = routes
