import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // eslint-disable-line
import { BrowserRouter, Route } from 'react-router-dom'; // eslint-disable-line

import Sling from './components/Sling/index.jsx'; // eslint-disable-line
import Auth from './components/Auth/Signup.jsx'; // eslint-disable-line
import App from './App.jsx'; // eslint-disable-line

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
