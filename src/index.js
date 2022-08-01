import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import './Styles/css/navbar.css'
import RoutesPage from './routesProyecto/routesPage';

const container = document.getElementById('app')

ReactDOM.render(
  <React.StrictMode>
    <App>      
    </App>
    <RoutesPage />
  </React.StrictMode>,
  container
);

reportWebVitals();
