const Joi = require('joi')

module.exports = function ({models, apiHelpers}) {
  return [
    async (req, res) => {
      let token = req.headers['codescannertoken']
      if (!token) throw apiHelpers.createError([{base: 'Not authorised'}], 403)
      let user = await models.User.getByToken({
        token: token,
        ip: req.ip,
        user_agent: req.headers['user-agent']
      })
      let submissionId = req.params.submissionId
      let submission = await models.CodeSubmissions.getOneForUser(user, submissionId)
      res.body = submission
    }
  ]
}
