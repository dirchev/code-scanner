const loadRouteConstructor = require('./loadRouteConstructor')
const FileService = require('../lib/file-service')
const CodeAnalysis = require('../lib/code-analysis')
const express = require('express')
const path = require('path')

let routes = async function ({app, models = {}}) {
  let fileService = new FileService({url: 'http://localhost:8081'})
  let codeAnalysis = new CodeAnalysis(models.CodeSubmission, fileService)
  let apiHelpers = {
    createError: function (errors, code) {
      let error = new Error('CustomError')
      error.isCodeScannerError = true
      error.code = code
      error.errors = errors
      return error
    },
    fileService: fileService,
    CodeAnalysis: codeAnalysis
  }

  // get all not processed files to analysis queue
  let codeSubmissions = await models.CodeSubmission.find({status: {$in: ['new', 'in queue', 'processing']}}).select('_id')
  codeSubmissions.forEach(function ({_id}) {
    codeAnalysis.addToQueue(_id)
  })

  // API endpoints
  let loadRoute = loadRouteConstructor(app, {models, apiHelpers})
  loadRoute('post', '/api/login', require('./api/login'))
  loadRoute('post', '/api/register', require('./api/register'))
  loadRoute('get', '/api/submissions', require('./api/submissions'))
  loadRoute('get', '/api/submissions/:submissionId', require('./api/submission'))
  loadRoute('post', '/api/submissions', require('./api/create-submission'))
  loadRoute('post', '/api/logout', require('./api/logout'))

  // server react app
  const CLIENT_BUILD_PATH = path.join(__dirname, '../../../client/build')
  app.use(express.static(CLIENT_BUILD_PATH))
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  })
}

module.exports = routes
