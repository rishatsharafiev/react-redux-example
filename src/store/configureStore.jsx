import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'reducers/index'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  )

  if (module.hot) {
    module.hot.accept('reducers', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('reducers/index')
      store.replaceReducer(nextRootReducer)
      /* eslint-enable global-require */
    })
  }

  return store
}
