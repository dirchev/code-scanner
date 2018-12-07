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
      let submission = await models.CodeSubmission.getOneForUser(submissionId, user)
      let file = await apiHelpers.fileService.readFile(submission.file_id)
      res.body = {
        submission: submission,
        file: file
      }
    }
  ]
}
