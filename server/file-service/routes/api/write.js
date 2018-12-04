const multer = require('multer')

module.exports = function ({models, apiHelpers}) {
  return [
    multer({
      dest: __dirname + '/../../files/',
      limits: {
        fileSize: 10000 // 10KB
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/javascript') {
          return cb(null, false)
        }
        if (file.originalname.split('.').pop() !== 'js') {
          return cb(null, false)
        }
        cb(null, true)
      }
    }).single('code_file'),
    async (req, res) => {
      if (!req.file) throw apiHelpers.errors.fileNotValidError()
      res.status(200).json(req.file)
    }
  ]
}
