import { all, fork } from 'redux-saga/effects'
import app from 'sagas/app'
import auth from 'sagas/auth'
import task from 'sagas/task'
import city from 'sagas/city'
import shop from 'sagas/shop'
import verification from 'sagas/verification'
import violation from 'sagas/violation'
import scanner from 'sagas/scanner'
import employee from 'sagas/employee'

export default function* rootSaga() {
  yield all([
    fork(app),
    fork(auth),
    fork(task),
    fork(city),
    fork(shop),
    fork(verification),
    fork(violation),
    fork(scanner),
    fork(employee),
  ])
}
