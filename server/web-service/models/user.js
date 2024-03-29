const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
var uniqueValidator = require('mongoose-unique-validator');


let schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  auth_tokens: {
    select: false,
    type: [{
      ip: String,
      user_agent: String,
      token: String
    }]
  }
})
schema.plugin(uniqueValidator, { message: '{PATH} has already been taken' })

schema.pre('save', async function () {
  var self = this
  if (!this.isModified('password')) return
  let hash = await bcrypt.hash(this.password, 5)
  this.password = hash
  return
})

schema.static('findByCredentials', async function (credentials) {
  if (!credentials.email || credentials.email.trim() === '') return null
  let user = await this.findOne({email: credentials.email.trim().toLowerCase()}).select('+password')
  if (!user) return null
  let passwordMatches = await bcrypt.compare(credentials.password, user.password)
  if (!passwordMatches) return null
  return await this.findOne({email: credentials.email.trim().toLowerCase()})
})

schema.method('generateToken', async function (data) {
  let cookieData = {
    ip: data.ip,
    user_agent: data.user_agent,
    token: uuid.v4()
  }
  await User.updateOne({_id: this.id}, {$push: {auth_tokens: cookieData}})
  return cookieData.token
})

schema.static('invalidateToken', async function (token) {
  return await this.updateMany({
    $pull: {
      auth_tokens: {token: token}
    }
  })
})

schema.static('getByToken', async function ({ip, user_agent, token}) {
  let query = {
    'auth_tokens': {
      $elemMatch: {
        ip,
        user_agent,
        token
      }
    }
  }
  return await User.findOne(query)
})

let User = mongoose.model('User', schema)

module.exports = User
