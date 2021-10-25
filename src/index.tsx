import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import {Provider} from "react-redux";
import {store} from "./store";

axios.defaults.baseURL = 'https://freecurrencyapi.net/api/'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.withCredentials = true

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
