const mongoose = require('mongoose')

let schema = new mongoose.Schema({
  title: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  file_id: String,
  created: {type: Date, default: Date.now},
  status: {type: String, enum: ['new', 'in queue', 'processed', 'failed']},
  analysisResult: [
    {
      line: Number,
      character: Number,
      text: String,
      type: {type: String, enum: ['warning', 'error']}
    }
  ]
})

schema.static('getAllForUser', async function (user) {
  return await this.find({user: user}).sort({created: -1})
})

let CodeSubmission = mongoose.model('CodeSubmission', schema)

module.exports = CodeSubmission
