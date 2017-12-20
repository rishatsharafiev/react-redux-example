import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import app from 'reducers/app'
import auth from 'reducers/auth'
import tasks from 'reducers/tasks'

const rootReducer = combineReducers({
  app,
  auth,
  tasks,
  form: formReducer,
})

export default rootReducer
