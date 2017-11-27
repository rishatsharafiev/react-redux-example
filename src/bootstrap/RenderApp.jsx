import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from 'bootstrap/Root';

let hotModuleCallbackRegistered = false;

export default function renderApp(target = document.getElementById('root')) {
  if (!target) {
    throw new Error('Bad target');
  }

  ReactDOM.render(
    (
      <AppContainer>
        <Root />
      </AppContainer>
    ), target,
  );

  if (module.hot && !hotModuleCallbackRegistered) {
    hotModuleCallbackRegistered = true;
    module.hot.accept('bootstrap/Root', () => { renderApp(target); });
  }
}
