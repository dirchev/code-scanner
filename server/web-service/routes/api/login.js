const Joi = require('joi')

module.exports = function ({models, apiHelpers}) {
  let schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  return [
    async (req, res) => {
      let data = await Joi.validate({
        email: req.body.email,
        password: req.body.password,
      }, schema)
      let user = await models.User.findByCredentials(data)
      if (!user) {
        let error = apiHelpers.createError([{base: 'email and password are not valid'}], 403)
        throw error
      }
      let token = await user.generateToken({
        ip: req.ip,
        user_agent: req.headers['user-agent'],
      })
      res.body = {
        ...user.toJSON(),
        token: token
      }
    }
  ]
}
