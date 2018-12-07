const multer = require('multer')

let errorsResponder = function (err, req, res, next) {
  let errorToSendBack = {}
  let statusCode = 500
  if (err.isCodeScannerError) {
    errorToSendBack = err
    statusCode = err.code
  } else {
    errorToSendBack = {
      name: 'UnexpectedError',
      isCodeScannerError: true
    }
  }
  res.status(statusCode).json(errorToSendBack)
  next()
}

module.exports = errorsResponder
