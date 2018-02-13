import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'reducers'
import rootSaga from 'sagas'
import { APP_INIT } from 'constants/app'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  )

  sagaMiddleware.run(rootSaga)
  store.dispatch({ type: APP_INIT })

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
