const multer = require('multer')

module.exports = function ({models, apiHelpers}) {
  return [
    async (req) => {
      console.log('a')
    },
    multer({storage: require('../../lib/multer-stream-storage')()}).single('file'),
    async (req) => {
      await apiHelpers.fileService.writeFile(req.file.stream)
    }
  ]
}
