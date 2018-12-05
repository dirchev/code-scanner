const Joi = require('joi')

module.exports = function ({models, apiHelpers}) {
  return [
    multer({storage: require('../../lib/multer-stream-storage')()}).single('file'),
    async (req, res) => {
      // todo validate request data
      let token = req.headers['codescannertoken']
      if (!token) throw apiHelpers.createError([{base: 'Not authorised'}], 403)
      let user = await models.User.getByToken({
        token: token,
        ip: req.ip,
        user_agent: req.headers['user-agent']
      })
      let file = await apiHelpers.fileService.writeFile(req.file.stream)
      // let submission = models.CodeSubmissions.create({
      //   user: user,
      //   title: req.body.title,
      //   file_id: req.file.
      // })
      // let submissions = await models.CodeSubmissions.getAllForUser(user)
      res.body = {success: true}
    }
  ]
}
