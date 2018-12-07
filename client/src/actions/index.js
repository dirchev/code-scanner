import axios from 'axios'
import toastr from 'toastr'
import Joi from 'joi'

let ENDPOINT = 'http://localhost:8080/api'
if (process.env.NODE_ENV === 'production') {
  ENDPOINT = window.location.origin + '/api'
}

let processErrors = function (err) {
  if (err.message === 'Network Error') {
    toastr.error('Could not connect to server')
    throw new Error('Could not connect to server')
  }
  if (err.isJoi) {
    let errorMessage = err.details.map((i) => i.message)
    throw new Error(errorMessage)
  }
  if (err.response.status === 422) {
    throw new Error(err.response.data.errors.map((i) => i.message).join(' '))
  } else if (err.response.status === 403) {
    throw new Error('Not authorised')
  } else if (err.response.status === 429) {
    toastr.error('You have made too many requests. Please wait...', 'Too many requests')
    throw new Error('Too many requests')
  } else if (err.response.status === 413) {
    toastr.error('Request entity too large.')
    throw new Error('The selected file exceeds the size limit.')
  } else {
    toastr.error('Please try again later', 'Unexpected Error')
    throw new Error('Unexpected Error')
  }
}

export let loginUser = async loginData => {
  try {
    let schema = Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
    loginData = await Joi.validate(loginData, schema)
    let response = await axios.post(`${ENDPOINT}/login`, loginData)
    window.localStorage.setItem('CodeScannerToken', response.data.token)
    window.localStorage.setItem('CodeScannerUser', JSON.stringify(response.data))
    axios.defaults.headers.common['CodeScannerToken'] = response.data.token;
    window.user = response.data
    return response.data
  } catch (err) {
    processErrors(err)
  }
}

export let registerUser = async registerData => {
  try {
    let schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
    registerData = await Joi.validate(registerData, schema)
    let response = await axios.post(`${ENDPOINT}/register`, registerData)
    return response.data
  } catch (err) {
    processErrors(err)
  }
}

export let logoutUser = async () => {
  let response = await axios.post(`${ENDPOINT}/logout`)
  window.localStorage.clear()
  return response.data
}

export let submitCode = async data => {
  try {
    let schema = Joi.object().keys({
      title: Joi.string().required(),
      codeSnippet: Joi.string(),
      codeFile: Joi.any(),
    }).or('codeSnippet', 'codeFile')
    data = await Joi.validate(data, schema)
    let response
    if (data.codeFile) {
      var formData = new FormData();
      formData.append("codeFile", data.codeFile);
      formData.append("title", data.title);
      response = await axios.post(`${ENDPOINT}/submissions`, formData)
    } else {
      response = await axios.post(`${ENDPOINT}/submissions`, data)
    }
    return response.data
  } catch (err) {
    processErrors(err)
  }
}

export let getSubmissions = async () => {
  try {
    let response = await axios.get(`${ENDPOINT}/submissions`, {})
    return response.data
  } catch (err) {
    processErrors(err)
  }
}

export let getSubmission = async (id) => {
  try {
    let response = await axios.get(`${ENDPOINT}/submissions/${id}`, {})
    return response.data
  } catch (err) {
    processErrors(err)
  }
}
