var mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost/code-scanner', {useNewUrlParser: true})
  let User = require('./user')
  let CodeSubmission = require('./code-submission')
  return {User, CodeSubmission}
}
