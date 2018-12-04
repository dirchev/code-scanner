const Joi = require('joi')

module.exports = function ({models, apiHelpers}) {
  let schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  return [
    apiHelpers.cors,
    async (req, res) => {
      let data = await Joi.validate({
        email: req.body.email,
        password: req.body.password,
      }, schema)
      res.body = data
    }
  ]
}
