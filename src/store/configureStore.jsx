import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'reducers'
import rootSaga from 'sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)),
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('reducers/index', () => {
      /* eslint-disable global-require */
      const createNextReducer = require('reducers/index')
      const nextRootReducer = createNextReducer()
      store.replaceReducer(nextRootReducer)
      /* eslint-enable global-require */
    })
  }

  return store
}
