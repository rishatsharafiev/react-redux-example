import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from 'reducers/auth'
import tasks from 'reducers/tasks'

const rootReducer = combineReducers({
  auth,
  tasks,
  form: formReducer,
})

export default rootReducer
