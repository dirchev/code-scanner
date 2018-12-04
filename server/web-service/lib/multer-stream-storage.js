class StreamStorage {
  _handleFile (req, file, cb) {
    cb(null, {
      stream: file.stream
    })
  }
}

module.exports = function (opts) {
  return new StreamStorage(opts)
}
