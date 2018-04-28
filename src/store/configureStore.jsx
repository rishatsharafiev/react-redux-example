import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'reducers'
import rootSaga from 'sagas'
import { APP_INIT } from 'constants/app'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]
  const reduxDevtoolsOptions = {
    maxAge: 30,
    latency: 1500,
    serialize: {
      options: false,
    },
  }
  const enhancers = compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__(reduxDevtoolsOptions)
      : f => f,
  )

  const store = createStore(
    rootReducer,
    initialState,
    enhancers,
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
