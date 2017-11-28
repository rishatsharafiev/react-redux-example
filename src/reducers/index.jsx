import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import task from 'reducers/task'

const rootReducer = combineReducers({
  task,
  form: formReducer,
})

export default rootReducer
