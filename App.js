import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './modules';
import Main from './Main';

const store = createStore(reducer);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
