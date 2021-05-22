import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Registro  from './components/Registro';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import * as boootsIcon from 'react-icons'
import App from './App';
import './Styles/css/navbar.css'

import Navbar from './components/Navbar';
const container = document.getElementById('app')

ReactDOM.render(
  <React.StrictMode>
    <App>
      
    </App>
  </React.StrictMode>,
  container
);

reportWebVitals();
