import { all, call } from 'redux-saga/effects'
import { loginFlow, registerFlow, logoutFlow } from 'sagas/auth'

export default function* rootSaga() {
  yield all([
    call(loginFlow),
    call(registerFlow),
    call(logoutFlow),
  ])
}
