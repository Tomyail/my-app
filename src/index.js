import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getAppStore } from './store';

import App from './App';
const store = getAppStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));
