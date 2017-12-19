import { all, call } from 'redux-saga/effects'
import appSaga from 'sagas/app'
import authSaga from 'sagas/auth'

export default function* rootSaga() {
  yield all([
    call(appSaga),
    call(authSaga),
  ])
}
