import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import {Provider} from "react-redux";
import {store} from "./store";

axios.defaults.baseURL = 'http://freecurrencyapi.net/api/v2/latest?apikey=01cbaac0-34e8-11ec-b7ff-112de751d5c7'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.withCredentials = true

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
