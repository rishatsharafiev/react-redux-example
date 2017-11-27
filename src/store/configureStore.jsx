import { createStore, applyMiddleware } from 'redux'
import rootReducer from 'reducers/index'
import thunk from 'redux-thunk'
import initial from 'reducers/initialState'
import { composeWithDevTools } from 'redux-devtools-extension'

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  )
}

const store = configureStore(initial)

export default store
