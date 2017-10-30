import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { getAppStore } from './store';
import CountDown from './component/CountDown';

const store = getAppStore();

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <CountDown/>
      </Provider>
    );
  }
}

export default App;
