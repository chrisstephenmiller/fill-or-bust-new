import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'
import Game from './components/game'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Game />
  </Router>
</Provider>,
  document.getElementById('root')
);
