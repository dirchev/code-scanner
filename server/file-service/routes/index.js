const errorsResponder = require('./errorResponder')
const loadRouteConstructor = require('./loadRouteConstructor')

let routes = function ({app, models = {}}) {
  let apiHelpers = {
    errors: {
      fileNotValidError: () => {
        let err = new Error('file not valid')
        err.name = 'FileUploadError'
        err.isCodeScannerError = true
        err.code = 422
        err.errors = [
          {
            message: err.message,
            path: 'code_file'
          }
        ]
        return err
      }
    }
  }
  let loadRoute = loadRouteConstructor(app, {models, apiHelpers})

  loadRoute('post', '/write',  require('./api/write'))
  loadRoute('get', '/read/:fileId', require('./api/read'))

  app.use(errorsResponder)
}

module.exports = routes
