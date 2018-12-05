let errorsResponder = function (err, req, res, next) {
  let errorToSendBack = err
  console.error(err)
  console.log(JSON.stringify(err, null, 2))
  let statusCode = 500
  if (err.isJoi) {
    errorToSendBack = {
      name: 'RequestDataError',
      errors: err.details.map((i) => ({
        message: i.message,
        path: i.path.join('.')
      }))
    }
    statusCode = 422
  } else if (err.isCodeScannerError) {
    errorToSendBack = err
    statusCode = err.code
  } else if (err.name === 'ValidationError') {
    errorToSendBack = {
      name: 'ValidationError',
      errors: Object.keys(err.errors).map((key) => ({
        message: err.errors[key].message,
        path: key
      }))
    }
    statusCode = 422
  } else {
    errorToSendBack = {
      name: 'UnexpectedError'
    }
  }
  res.status(statusCode).json(errorToSendBack)
  next()
}

module.exports = errorsResponder
