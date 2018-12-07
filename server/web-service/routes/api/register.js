const Joi = require('joi')

module.exports = function ({models, apiHelpers}) {
  // from: https://stackoverflow.com/a/5142164/3561085
  let passwordREGEX = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
  let schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
     .regex(passwordREGEX, {name: 'two capital, two lowercase, two digits and one special sign'})
     .required()
     .error(() => 'password must contain at least two capital and two lowercase letters, two digits and one special sign and have a length of at least 8 characters')
  })
  return [
    async (req, res) => {
      let data = await Joi.validate({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }, schema)
      let user = await models.User.create(data)
      await user.save()
      res.body = {success: true}
    }
  ]
}
