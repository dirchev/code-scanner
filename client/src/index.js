import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bulma/css/bulma.css';
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import store from './store'
import axios from 'axios'

let token = window.localStorage.getItem('CodeScannerToken')
if (token) {
  axios.defaults.headers.common['CodeScannerToken'] = token
  console.log('setting token')
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
