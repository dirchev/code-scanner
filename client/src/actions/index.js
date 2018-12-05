import axios from 'axios'

export let loginUser = loginData => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN_START',
    })
    let {data} = await axios.post('http://localhost:8080/login', loginData)
    window.localStorage.setItem('CodeScannerToken', data.token)
    axios.defaults.headers.post['CodeScannerToken'] = data.token;
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: data
    })
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: err
    })
  }
}

export let registerUser = registerData => async dispatch => {
  try {
    dispatch({
      type: 'REGISTER_START',
    })
    let response = await axios.post('http://localhost:8080/register', registerData)
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: response
    })
  } catch (err) {
    dispatch({
      type: 'REGISTER_ERROR',
      payload: err
    })
  }
}

export let logoutUser = () => async dispatch => {
  try {
    dispatch({
      type: 'LOGOUT_START',
    })
    let response = await axios.post('http://localhost:8080/logout')
    dispatch({
      type: 'LOGOUT_SUCCESS',
      payload: response
    })
  } catch (err) {
    dispatch({
      type: 'LOGOUT_ERROR',
      payload: err
    })
  }
}

export let getSubmissions = data => async dispatch => {
  try {
    dispatch({
      type: 'GETSUBMISSIONS_START',
    })
    let response = await axios.get('http://localhost:8080/submissions', data)
    dispatch({
      type: 'GETSUBMISSIONS_SUCCESS',
      payload: response
    })
  } catch (err) {
    dispatch({
      type: 'GETSUBMISSIONS_ERROR',
      payload: err
    })
  }
}

export let getCodeAnalysis = data => async dispatch => {
  try {
    dispatch({
      type: 'GETCODEANALYSIS_START',
    })
    let response = await axios.get('/analysis/' + data.id, data)
    dispatch({
      type: 'GETCODEANALYSIS_SUCCESS',
      payload: response
    })
  } catch (err) {
    dispatch({
      type: 'GETCODEANALYSIS_ERROR',
      payload: err
    })
  }
}
