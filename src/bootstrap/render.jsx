import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store/configureStore'
import initialState from 'reducers/initialState'
import Root from 'bootstrap/root'

const render = (Component, target = document.getElementById('root')) => {
  if (!target) {
    throw new Error('Bad target')
  }

  ReactDOM.render(
    <Provider store={store(initialState)}>
      <Component />
    </Provider>,
    target,
  )
}

export default function renderApp(target) {
  render(Root, target)

  if (module.hot) {
    module.hot.accept('bootstrap/root', () => {
      /* eslint-disable global-require */
      const NextRoot = require('bootstrap/root').default
      render(NextRoot, target)
      /* eslint-enable global-require */
    })
  }
}
