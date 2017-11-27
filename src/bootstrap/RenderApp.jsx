import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from 'bootstrap/Root';

const render = (Component, target = document.getElementById('root')) => {
  if (!target) {
    throw new Error('Bad target');
  }

  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    target,
  );
};

export default function renderApp(target) {
  render(Root, target);

  if (module.hot) {
    module.hot.accept('bootstrap/Root', () => {
      /* eslint-disable global-require */
      const NextRoot = require('bootstrap/Root').default;
      render(NextRoot, target);
      /* eslint-enable global-require */
    });
  }
}
