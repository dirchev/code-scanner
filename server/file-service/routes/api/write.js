const multer = require('multer')
const path = require('path')

module.exports = function ({models, apiHelpers}) {
  return [
    multer({
      dest: path.join(__dirname, '/../../files/'),
      limits: {
        fileSize: 10000 // 10KB
      }
    }).single('code_file'),
    async (req, res) => {
      if (!req.file) throw apiHelpers.errors.fileNotValidError()
      res.status(200).json({fileId: req.file.filename})
    }
  ]
}
