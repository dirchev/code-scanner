import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bulma/css/bulma.css';
import * as serviceWorker from './serviceWorker'

import axios from 'axios'
import 'toastr/build/toastr.css'

// load logged in user
let token = window.localStorage.getItem('CodeScannerToken')
let user = window.localStorage.getItem('CodeScannerUser')
if (token) {
  window.user = JSON.parse(user)
  axios.defaults.headers.common['CodeScannerToken'] = token
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <App />,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
