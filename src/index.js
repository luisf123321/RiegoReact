import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datepicker/dist/react-datepicker.css";
import App from './App';
import './Styles/css/navbar.css'
import RoutesPage from './routesProyecto/routesPage';

const container = document.getElementById('app')

ReactDOM.render(
  <React.StrictMode  >
    <RoutesPage />
  </React.StrictMode>,
  container
);

reportWebVitals();
