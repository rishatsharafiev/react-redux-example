import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import app from 'reducers/app'
import auth from 'reducers/auth'
import task from 'reducers/task'
import city from 'reducers/city'
import shop from 'reducers/shop'
import verification from 'reducers/verification'
import violation from 'reducers/violation'

const rootReducer = combineReducers({
  app,
  auth,
  task,
  city,
  shop,
  verification,
  violation,
  form: formReducer,
})

export default rootReducer
