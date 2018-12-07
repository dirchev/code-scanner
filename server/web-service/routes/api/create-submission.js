const Joi = require('joi')
const multer = require('multer')
const uuid = require('uuid')
const fs = require('fs')

let writeFileToTMP = function (string) {
  return new Promise(function (resolve, reject) {
    let path = '/tmp/' + uuid.v4()
    fs.writeFile(path, string, function (err) {
      if (err) reject(err)
      resolve(path)
    })
  })
}

module.exports = function ({models, apiHelpers}) {
  let schema = Joi.object().keys({
    title: Joi.string().required(),
    file: Joi.string().required().error(() => '"code" must not be empty')
  })
  return [
    multer({dest: '/tmp'}).single('codeFile'),
    async (req) => {
      if (req.file) {
        req.codeFilePath = req.file.path
      } else if (req.body.codeSnippet) {
        req.codeFilePath = await writeFileToTMP(req.body.codeSnippet)
      }
    },
    async (req, res) => {
      await Joi.validate({title: req.body.title, file: req.codeFilePath}, schema)
      // todo validate request data
      let token = req.headers['codescannertoken']
      if (!token) throw apiHelpers.createError([{base: 'Not authorised'}], 403)
      let user = await models.User.getByToken({
        token: token,
        ip: req.ip,
        user_agent: req.headers['user-agent']
      })
      if (!user) throw apiHelpers.createError([{base: 'Not authorised'}], 403)
      let stream = fs.createReadStream(req.codeFilePath)
      let response = await apiHelpers.fileService.writeFile(stream)
      let submission = await models.CodeSubmission.create({
        user: user,
        title: req.body.title,
        file_id: response.fileId.toString(),
        status: 'new'
      })
      res.body = submission
      apiHelpers.CodeAnalysis.addToQueue(submission._id)
    }
  ]
}
