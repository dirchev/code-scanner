import axios from 'axios'

export let loginUser = async loginData => {
  try {
    let response = await axios.post('http://localhost:8080/login', loginData)
    window.localStorage.setItem('CodeScannerToken', response.data.token)
    window.localStorage.setItem('CodeScannerUser', JSON.stringify(response.data))
    axios.defaults.headers.common['CodeScannerToken'] = response.data.token;
    window.user = response.data
    return response.data
  } catch (err) {
    throw err.response.data.errors.map((i) => i.message).join(' ')
  }
}

export let registerUser = async registerData => {
  try {
    let response = await axios.post('http://localhost:8080/register', registerData)
    return response.data
  } catch (err) {
    throw err.response.data.errors.map((i) => i.message).join(' ')
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
    throw err.response.data.errors.map((i) => i.message).join(' ')
  }
}

export let getSubmissions = async () => {
  try {
    let response = await axios.get('http://localhost:8080/submissions', {})
    return response.data
  } catch (err) {
    throw err.response.data.errors.map((i) => i.message).join(' ')
  }
}

export let getSubmission = async (id) => {
  try {
    let response = await axios.get('http://localhost:8080/submissions/' + id, {})
    return response.data
  } catch (err) {
    throw err.response.data.errors.map((i) => i.message).join(' ')
  }
}
