import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from 'reducers/auth'
import task from 'reducers/task'

const rootReducer = combineReducers({
  auth,
  task,
  form: formReducer,
})

export default rootReducer
