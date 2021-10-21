import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './Routing';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'; 
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
