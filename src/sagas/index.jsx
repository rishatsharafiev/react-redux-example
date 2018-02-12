import { all, fork } from 'redux-saga/effects'
import appSaga from 'sagas/app'
import authSaga from 'sagas/auth'
import taskSaga from 'sagas/task'
import citySaga from 'sagas/city'

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(authSaga),
    fork(taskSaga),
    fork(citySaga),
  ])
}
