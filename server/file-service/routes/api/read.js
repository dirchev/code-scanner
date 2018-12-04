const multer = require('multer')

module.exports = function ({models, apiHelpers}) {
  return [
    async (req, res) => {
      let fileId = req.body.fileId
      let readStream = fs.createReadStream(__dirname + '../' + fileId)
      res.send(readStream)
    }
  ]
}
