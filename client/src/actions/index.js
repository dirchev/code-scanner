import axios from 'axios'
import toastr from 'toastr'

let processErrors = function (err) {
  if (err.response.status === 422) {
    throw err.response.data.errors.map((i) => i.message).join(' ')
  } else if (err.response.status === 403) {
    throw 'Not authorised'
  } else if (err.response.status === 429) {
    toastr.error('You have made too many requests. Please wait...', 'Too many requests')
    throw 'Too many requests'
  } else {
    toastr.error('Please try again later', 'Unexpected Error')
    throw 'Unexpected Error'
  }
}

export let loginUser = async loginData => {
  try {
    let response = await axios.post('http://localhost:8080/login', loginData)
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
    let response = await axios.post('http://localhost:8080/register', registerData)
    return response.data
  } catch (err) {
    processErrors(err)
  }
}

export let logoutUser = async () => {
  let response = await axios.post('http://localhost:8080/logout')
  window.localStorage.clear()
  return response.data
}

export let submitCode = async data => {
  try {
    let response
    if (data.codeFile) {
      var formData = new FormData();
      formData.append("codeFile", data.codeFile);
      formData.append("title", data.title);
      response = await axios.post('http://localhost:8080/submissions', formData)
    } else {
      response = await axios.post('http://localhost:8080/submissions', data)
    }
    return response.data
  } catch (err) {
    processErrors(err)
  }
}

export let getSubmissions = async () => {
  try {
    let response = await axios.get('http://localhost:8080/submissions', {})
    return response.data
  } catch (err) {
    processErrors(err)
  }
}

export let getSubmission = async (id) => {
  try {
    let response = await axios.get('http://localhost:8080/submissions/' + id, {})
    return response.data
  } catch (err) {
    processErrors(err)
  }
}
