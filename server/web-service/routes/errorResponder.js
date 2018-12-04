let errorsResponder = function (err, req, res, next) {
  let errorToSendBack = err
  console.log(err)
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
  } else {
    // errorToSendBack = {
    //   name: 'UnexpectedError'
    // }
  }
  res.status(statusCode).json(errorToSendBack)
  next()
}

module.exports = errorsResponder
