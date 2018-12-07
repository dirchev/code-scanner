const path = require('path')
const fs = require('fs')

let readFile = function (fileId) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, '../../files', fileId), 'utf-8', function (err, file) {
      if (err) return reject(err)
      resolve(file)
    })
  })
}

module.exports = function ({models, apiHelpers}) {
  return [
    async (req, res) => {
      let fileId = req.params.fileId
      let file = await readFile(fileId)
      res.status(200).send(file)
    }
  ]
}
