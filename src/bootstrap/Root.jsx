import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { routes } from './Routes.jsx';
import { store } from '../store/configureStore';

function handleRouteChange() {
  window.scrollTo(0,0);
}

const Root = (props) => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
      onUpdate={handleRouteChange}
    />
  </Provider>
);

export default Root;
